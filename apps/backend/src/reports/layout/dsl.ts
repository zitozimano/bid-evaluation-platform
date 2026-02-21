import PDFDocument from "pdfkit";
import { PageBuilder } from "./page";
import { SectionBuilder } from "./sections";
import { Theme } from "../branding/theme";

export class ReportBuilder {
  private doc: PDFKit.PDFDocument;
  private theme: Theme;
  private sectionCounter = 0;
  private sections: ((doc: PDFKit.PDFDocument) => void)[] = [];
  private headerFn: ((page: PageBuilder) => void) | null = null;
  private watermarkText: string | null = null;

  constructor(theme: Theme) {
    this.theme = theme;
    this.doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });
  }

  header(fn: (header: PageBuilder) => void) {
    this.headerFn = fn;
    return this;
  }

  watermark(text: string) {
    this.watermarkText = text;
    return this;
  }

  section(title: string, fn: (section: SectionBuilder) => void) {
    this.sectionCounter++;
    const section = new SectionBuilder(
      this.sectionCounter,
      title,
      this.theme
    );
    fn(section);
    this.sections.push(doc => section.render(doc));
    return this;
  }

  render(): PDFKit.PDFDocument {
    const page = new PageBuilder(this.doc, this.theme);

    if (this.headerFn) {
      this.headerFn(page);
    }

    if (this.watermarkText) {
      page.watermark(this.watermarkText);
    }

    for (const s of this.sections) {
      s(this.doc);
    }

    this.doc.end();
    return this.doc;
  }
}
