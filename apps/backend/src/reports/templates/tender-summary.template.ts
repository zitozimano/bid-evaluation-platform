import PDFDocument from "pdfkit";
import { generateQrDataUrl } from "../utils/qr-utils";

export async function buildTenderSummaryPdf(data: any): Promise<PDFKit.PDFDocument> {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(20).text("Tender Summary", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Tender: ${data.tender.description}`);
  doc.text(`Department: ${data.tender.department}`);
  doc.text(`Closing Date: ${data.tender.closingDate}`);
  doc.moveDown();

  doc.fontSize(14).text("Bidders", { underline: true });
  data.tender.bidders.forEach((b: any) => {
    doc.text(`- ${b.name}`);
  });
  doc.moveDown();

  const qr = await generateQrDataUrl(data.verificationUrl);
  doc.image(qr, { width: 120, align: "center" });

  doc.text("Scan to verify", { align: "center" });

  doc.end();
  return doc;
}
