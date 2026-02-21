import { ReportBuilder } from "../../layout/dsl";
import { ThemeBuilder } from "../../branding/theme";
import { LogoLoader } from "../../branding/logo";

interface AuditPackContext {
  tenant: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    logoPath?: string;
  };
  period: {
    label: string;
  };
  findingsTable: string[][];
  actionsTable: string[][];
}

export async function buildAuditPackPdf(
  ctx: AuditPackContext
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
        .title(`Audit Pack – ${ctx.period.label}`)
        .subtitle(ctx.tenant.name)
    )
    .watermark("CONFIDENTIAL")
    .section("Summary of Findings", s => s.table(ctx.findingsTable))
    .section("Management Action Plan", s => s.table(ctx.actionsTable));

  return pdf.render();
}
