import { Theme } from "../branding/theme";
import { WatermarkEngine } from "./watermark";

export class PageBuilder {
  constructor(
    private doc: PDFKit.PDFDocument,
    private theme: Theme
  ) {}

  logo(buffer: Buffer) {
    this.doc.image(buffer, 50, 40, { width: 60 });
    return this;
  }

  title(text: string) {
    this.doc
      .font(this.theme.fonts.bold)
      .fontSize(18)
      .text(text, 120, 40);
    return this;
  }

  subtitle(text: string) {
    this.doc
      .font(this.theme.fonts.regular)
      .fontSize(12)
      .fillColor(this.theme.colors.secondary)
      .text(text, 120, 65);
    return this;
  }

  watermark(text: string) {
    new WatermarkEngine(this.doc, this.theme).render(text);
    return this;
  }
}
