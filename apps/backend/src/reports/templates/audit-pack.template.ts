import PDFDocument from "pdfkit";

export function buildAuditPackPdf(data: any): PDFKit.PDFDocument {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(20).text("Internal Audit Pack", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text("Tender Details", { underline: true });
  doc.text(JSON.stringify(data.tender, null, 2));
  doc.moveDown();

  doc.fontSize(14).text("Evaluation Details", { underline: true });
  doc.text(JSON.stringify(data.evaluation, null, 2));
  doc.moveDown();

  doc.fontSize(14).text("Documents", { underline: true });
  doc.text(JSON.stringify(data.documents, null, 2));
  doc.moveDown();

  doc.fontSize(14).text("Audit Trail", { underline: true });
  doc.text(JSON.stringify(data.auditTrail, null, 2));

  doc.end();
  return doc;
}
