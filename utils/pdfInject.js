const { PDFDocument, rgb } = require("pdf-lib");

async function injectFields(pdfBytes, fields) {
  const pdfDoc = await PDFDocument.load(pdfBytes);

  for (let f of fields) {
    const pageIndex = f.page || 0;
    if (pageIndex >= pdfDoc.getPageCount()) continue;
    const page = pdfDoc.getPage(pageIndex);
    const { width: pageW, height: pageH } = page.getSize();

    const px = f.x * pageW;
    const pyTop = f.y * pageH;
    const py = pageH - pyTop - (f.h * pageH);
    const pW = f.w * pageW;
    const pH = f.h * pageH;

    const type = f.type.toLowerCase();

    // Image / Signature
    if (type === "signature" || type === "image") {
      try {
        let base64Data = f.data;
        if (!base64Data) continue;
        if (base64Data.includes(",")) base64Data = base64Data.split(",")[1];

        const imgBytes = Buffer.from(base64Data, "base64");
        let pdfImage;
        try { pdfImage = await pdfDoc.embedPng(imgBytes); }
        catch { pdfImage = await pdfDoc.embedJpg(imgBytes); }

        const scale = Math.min(pW / pdfImage.width, pH / pdfImage.height);
        const drawW = pdfImage.width * scale;
        const drawH = pdfImage.height * scale;
        const drawX = px + (pW - drawW) / 2;
        const drawY = py + (pH - drawH) / 2;

        page.drawImage(pdfImage, { x: drawX, y: drawY, width: drawW, height: drawH });
      } catch (err) {
        console.error("Image injection failed:", err);
      }
    }

    // Text
    if (type === "text") {
      page.drawText(f.data || "Text", {
        x: px + 4,
        y: py + pH - 16,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }
  }

  return await pdfDoc.save();
}

module.exports = { injectFields };
