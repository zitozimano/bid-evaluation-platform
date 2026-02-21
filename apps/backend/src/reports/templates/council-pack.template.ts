import PDFDocument from "pdfkit";
import { generateQrDataUrl } from "../utils/qr-utils";

export async function buildCouncilPackPdf(data: any): Promise<PDFKit.PDFDocument> {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(20).text("Council Pack", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Tender: ${data.tender.description}`);
  doc.text(`Department: ${data.tender.department}`);
  doc.text(`Closing Date: ${data.tender.closingDate}`);
  doc.moveDown();

  doc.fontSize(16).text("Evaluation Summary", { underline: true });
  doc.moveDown(0.5);

  doc.fontSize(12).text(JSON.stringify(data.evaluation, null, 2));
  doc.moveDown();

  doc.fontSize(16).text("Recommendation", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(JSON.stringify(data.evaluation.recommendation ?? {}, null, 2));
  doc.moveDown();

  const qr = await generateQrDataUrl(data.verificationUrl);
  doc.image(qr, { width: 120, align: "center" });

  doc.text("Scan to verify", { align: "center" });

  doc.end();
  return doc;
}
