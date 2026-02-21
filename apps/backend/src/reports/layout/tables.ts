import { Theme } from "../branding/theme";

export class TableBuilder {
  constructor(
    private theme: Theme,
    private data: any[]
  ) {}

  render(doc: PDFKit.PDFDocument) {
    const startX = doc.x;
    const colWidth = 500 / this.data[0].length;

    this.data.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      const bg = isHeader
        ? this.theme.colors.primary
        : rowIndex % 2 === 0
        ? "#f5f5f5"
        : "#ffffff";

      doc.rect(startX, doc.y, 500, 20).fill(bg).fillColor("#000");

      row.forEach((cell: string, colIndex: number) => {
        doc
          .fillColor(isHeader ? "#fff" : "#000")
          .font(isHeader ? this.theme.fonts.bold : this.theme.fonts.regular)
          .fontSize(10)
          .text(cell, startX + colIndex * colWidth + 5, doc.y + 5, {
            width: colWidth - 10,
          });
      });

      doc.y += 20;
    });

    doc.moveDown();
  }
}
