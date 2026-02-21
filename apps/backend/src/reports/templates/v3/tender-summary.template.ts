import { ReportBuilder } from "../../layout/dsl";
import { ThemeBuilder } from "../../branding/theme";
import { LogoLoader } from "../../branding/logo";

interface TenderSummaryContext {
  tenant: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    logoPath?: string;
  };
  tender: {
    number: string;
    description: string;
    department: string;
    budget: string;
  };
  biddersTable: string[][];
}

export async function buildTenderSummaryPdf(
  ctx: TenderSummaryContext
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
        .title(`Tender Summary – ${ctx.tender.number}`)
        .subtitle(
          `${ctx.tender.description} • ${ctx.tender.department} • Budget: ${ctx.tender.budget}`
        )
    )
    .section("Overview", s =>
      s.text(
        `This summary provides a high-level view of tender ${ctx.tender.number} for ${ctx.tender.department}, with an approved budget of ${ctx.tender.budget}.`
      )
    )
    .section("Bidders", s => s.table(ctx.biddersTable));

  return pdf.render();
}
