import { ReportDebugFlags } from "./debug-flags";

export class DebugOverlay {
  constructor(private doc: PDFKit.PDFDocument) {}

  sectionBoundary(yStart: number, yEnd: number) {
    if (!ReportDebugFlags.enabled) return;

    this.doc
      .save()
      .strokeColor("#FF0000")
      .lineWidth(0.5)
      .rect(40, yStart, 515, yEnd - yStart)
      .stroke()
      .restore();
  }

  columnBoundary(x: number, width: number, yStart: number, yEnd: number) {
    if (!ReportDebugFlags.enabled) return;

    this.doc
      .save()
      .strokeColor("#00AAFF")
      .lineWidth(0.5)
      .rect(x, yStart, width, yEnd - yStart)
      .stroke()
      .restore();
  }

  tableRowBoundary(y: number) {
    if (!ReportDebugFlags.enabled) return;

    this.doc
      .save()
      .strokeColor("#00CC00")
      .lineWidth(0.3)
      .moveTo(40, y)
      .lineTo(555, y)
      .stroke()
      .restore();
  }
}
