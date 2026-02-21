import { Module } from "@nestjs/common";
import { HtmlPdfService } from "./html-pdf.service";

@Module({
  providers: [HtmlPdfService],
  exports: [HtmlPdfService],
})
export class PdfModule {}
