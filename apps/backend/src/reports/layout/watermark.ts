import { Theme } from "../branding/theme";

export class WatermarkEngine {
  constructor(
    private doc: PDFKit.PDFDocument,
    private theme: Theme
  ) {}

  render(text: string) {
    this.doc
      .font(this.theme.fonts.bold)
      .fontSize(80)
      .fillColor("#cccccc")
      .opacity(0.2)
      .rotate(-30, { origin: [300, 400] })
      .text(text, 100, 300, { align: "center" })
      .rotate(30)
      .opacity(1)
      .fillColor("#000");
  }
}
