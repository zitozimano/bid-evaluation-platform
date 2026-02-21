import PDFDocument from "pdfkit";

interface VerificationCertificateProps {
  hash: string;
  tenderNumber: string;
  type: string;
  qr: Buffer;
  signatureValid: boolean;
  signatureAlgorithm?: string;
  signedAt?: string;
}

export function buildVerificationCertificatePdf(props: VerificationCertificateProps) {
  const {
    hash,
    tenderNumber,
    type,
    qr,
    signatureValid,
    signatureAlgorithm,
    signedAt,
  } = props;

  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  // HEADER
  doc
    .fontSize(22)
    .fillColor("#000")
    .text("Verification Certificate", { align: "center" })
    .moveDown(1);

  doc
    .fontSize(12)
    .fillColor("#444")
    .text("This certificate verifies the authenticity and integrity of a HydroFlow-generated report.", {
      align: "center",
    })
    .moveDown(2);

  // QR CODE
  doc.image(qr, doc.page.width / 2 - 75, doc.y, {
    width: 150,
    height: 150,
  });

  doc.moveDown(2);

  // VERIFICATION DETAILS
  doc.fontSize(14).fillColor("#000").text("Verification Details", { underline: true }).moveDown(1);

  doc.fontSize(12).fillColor("#000");
  doc.text(`Tender Number: ${tenderNumber}`);
  doc.text(`Report Type: ${type}`);
  doc.text(`Verification Hash: ${hash}`);
  doc.moveDown(1);

  // SIGNATURE STATUS BLOCK
  doc.fontSize(14).fillColor("#000").text("Digital Signature", { underline: true }).moveDown(1);

  if (signatureValid) {
    doc
      .fillColor("#0A7A0A")
      .fontSize(12)
      .text("✔ Signature Valid — This report has been digitally signed by HydroFlow.", {
        continued: false,
      });
  } else {
    doc
      .fillColor("#B00020")
      .fontSize(12)
      .text("✖ Signature Invalid — This report is NOT cryptographically signed.", {
        continued: false,
      });
  }

  doc.moveDown(1);

  doc.fillColor("#000").fontSize(12);
  doc.text(`Signature Algorithm: ${signatureAlgorithm ?? "N/A"}`);
  doc.text(`Signed At: ${signedAt ?? "N/A"}`);

  doc.moveDown(2);

  // FOOTER
  doc
    .fontSize(10)
    .fillColor("#666")
    .text(
      "HydroFlow Digital Governance Backbone — Ensuring transparency, integrity, and trust in public financial management.",
      { align: "center" }
    );

  doc.end();
  return doc;
}
