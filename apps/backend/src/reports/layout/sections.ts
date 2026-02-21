import { Theme } from "../branding/theme";
import { TableBuilder } from "./tables";

export class SectionBuilder {
  private columns: ((doc: PDFKit.PDFDocument) => void)[] = [];

  constructor(
    private index: number,
    private title: string,
    private theme: Theme
  ) {}

  columnsLayout(fn: (cols: ColumnsBuilder) => void) {
    const builder = new ColumnsBuilder(this.theme);
    fn(builder);
    this.columns.push(doc => builder.render(doc));
    return this;
  }

  table(data: any[]) {
    const table = new TableBuilder(this.theme, data);
    this.columns.push(doc => table.render(doc));
    return this;
  }

  text(content: string) {
    this.columns.push(doc => {
      doc
        .moveDown()
        .font(this.theme.fonts.regular)
        .fontSize(11)
        .fillColor("#000")
        .text(content, { width: 500 });
    });
    return this;
  }

  render(doc: PDFKit.PDFDocument) {
    doc
      .moveDown()
      .font(this.theme.fonts.bold)
      .fontSize(14)
      .text(`${this.index}. ${this.title}`);

    for (const c of this.columns) {
      c(doc);
    }
  }
}

export class ColumnsBuilder {
  private cols: { width: number; render: (doc: PDFKit.PDFDocument) => void }[] =
    [];

  constructor(private theme: Theme) {}

  col(widthPercent: number, fn: (col: ColumnContentBuilder) => void) {
    const builder = new ColumnContentBuilder(this.theme);
    fn(builder);
    this.cols.push({
      width: widthPercent,
      render: doc => builder.render(doc),
    });
    return this;
  }

  render(doc: PDFKit.PDFDocument) {
    const startX = doc.x;
    const startY = doc.y;

    this.cols.forEach((col, i) => {
      const colWidth = (col.width / 100) * 500;
      doc.x = startX + i * (500 / this.cols.length);
      col.render(doc);
      doc.x = startX;
      doc.y = startY;
    });

    doc.moveDown();
  }
}

export class ColumnContentBuilder {
  private actions: ((doc: PDFKit.PDFDocument) => void)[] = [];

  constructor(private theme: Theme) {}

  text(content: string) {
    this.actions.push(doc =>
      doc
        .font(this.theme.fonts.regular)
        .fontSize(11)
        .text(content, { width: 200 })
    );
    return this;
  }

  table(data: any[]) {
    const table = new TableBuilder(this.theme, data);
    this.actions.push(doc => table.render(doc));
    return this;
  }

  render(doc: PDFKit.PDFDocument) {
    for (const a of this.actions) a(doc);
  }
}
