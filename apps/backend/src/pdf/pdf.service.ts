import { Injectable } from "@nestjs/common";
import PDFDocument from "pdfkit";
import * as QRCode from "qrcode";
import { Response } from "express";

@Injectable()
export class PdfService {
  async generateEvaluationReport(
    res: Response,
    data: {
      tenderNumber: string;
      tenderDescription: string;
      runNumber: number;
      hash: string;
      generatedAt: Date;
      results: Array<{
        bidderName: string;
        totalScore: number;
        price: number;
        bbbeeLevel: number | null;
      }>;
    }
  ) {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="evaluation-${data.tenderNumber}-run-${data.runNumber}.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(18).text("Bid Evaluation Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Tender: ${data.tenderNumber}`);
    doc.text(`Description: ${data.tenderDescription}`);
    doc.text(`Run: ${data.runNumber}`);
    doc.text(`Generated: ${data.generatedAt.toISOString()}`);
    doc.moveDown();

    doc.fontSize(14).text("Results", { underline: true });
    doc.moveDown(0.5);

    data.results.forEach((r, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${r.bidderName} — Total: ${r.totalScore.toFixed(
          2
        )}, Price: ${r.price.toFixed(2)}, BBBEE: ${
          r.bbbeeLevel ?? "N/A"
        }`
      );
    });

    doc.moveDown();

    const qrData = `Hash: ${data.hash}`;
    const qrPng = await QRCode.toDataURL(qrData);

    const qrBase64 = qrPng.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrBase64, "base64");

    doc.addPage();
    doc.fontSize(14).text("Verification", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Hash: ${data.hash}`);
    doc.moveDown();
    doc.image(qrBuffer, { fit: [150, 150] });

    doc.end();
  }
}
