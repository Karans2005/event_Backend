const express = require("express");
const PdfAudit = require("../models/PdfAudit");
const { sha256 } = require("../utils/hashPdf");
const { injectFields } = require("../utils/pdfInject");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { pdfBase64, fields, pdfId } = req.body;

    if (!pdfBase64 || !fields || !pdfId) {
      return res.status(400).json({ error: "Missing payload fields" });
    }

    if (!Array.isArray(fields)) {
      return res.status(400).json({ error: "fields must be an array" });
    }

    // ✅ Base64 split & debug
    const base64Part = pdfBase64.split(",")[1];
    if (!base64Part) {
      return res.status(400).json({ error: "Invalid PDF base64" });
    }

    const pdfBytes = Buffer.from(base64Part, "base64");
    console.log("PDF Bytes length:", pdfBytes.length);

    // ✅ Safe PDF load (try-catch)
    let pdfDoc;
    try {
      pdfDoc = await PDFDocument.load(pdfBytes);
    } catch (e) {
      return res.status(400).json({ error: "Invalid PDF file" });
    }

    // 🔹 Debug: fields before injection
    console.log("Injecting fields:", fields);
    fields.forEach((f, i) => {
      console.log(`Field ${i} type: ${f.type}, data length: ${f.data?.length || 0}`);
    });

    // ✅ Safe injectFields call
    let signedPdf;
    try {
      signedPdf = await injectFields(pdfBytes, fields);
    } catch (e) {
      console.error("❌ injectFields failed:", e);
      return res.status(400).json({ error: "Error injecting fields" });
    }

    const originalHash = sha256(pdfBytes);
    const signedHash = sha256(signedPdf);

    await PdfAudit.create({ pdfId, originalHash, signedHash });

    const signedPdfBase64 = `data:application/pdf;base64,${Buffer.from(signedPdf).toString("base64")}`;
    res.json({ pdfUrl: signedPdfBase64, originalHash, signedHash });

  } catch (err) {
    console.error("❌ Sign PDF Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
