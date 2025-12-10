const mongoose = require("mongoose");

const PdfAuditSchema = new mongoose.Schema({
  pdfId: { type: String, required: true },
  originalHash: { type: String, required: true },
  signedHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PdfAudit", PdfAuditSchema);
