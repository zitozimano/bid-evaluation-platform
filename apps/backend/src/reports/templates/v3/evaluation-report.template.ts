import { ReportBuilder } from "../../layout/dsl";
import { ThemeBuilder } from "../../branding/theme";
import { LogoLoader } from "../../branding/logo";

interface EvaluationReportContext {
  tenant: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    logoPath?: string;
  };
  tender: {
    number: string;
    description: string;
  };
  summaryTable: string[][];
  rankingsTable: string[][];
}

export async function buildEvaluationReportPdf(
  ctx: EvaluationReportContext
): Promise<PDFKit.PDFDocument> {
  const logo = await LogoLoader.load(ctx.tenant.logoPath);

  const theme = new ThemeBuilder()
    .setColors(ctx.tenant.primaryColor, ctx.tenant.secondaryColor)
    .setLogo(logo)
    .build();

  const pdf = new ReportBuilder(theme);

  pdf
    .header(h =>
      h
        .logo(logo)
        .title(`Evaluation Report – ${ctx.tender.number}`)
        .subtitle(ctx.tender.description)
    )
    .watermark("CONFIDENTIAL")
    .section("Overview", s =>
      s.text(
        `This report summarises the evaluation outcome for tender ${ctx.tender.number} – ${ctx.tender.description}.`
      )
    )
    .section("Summary", s => s.table(ctx.summaryTable))
    .section("Rankings", s => s.table(ctx.rankingsTable));

  return pdf.render();
}
