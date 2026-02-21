import { ReportBuilder } from "../../layout/dsl";
import { ThemeBuilder } from "../../branding/theme";
import { LogoLoader } from "../../branding/logo";

interface CouncilPackContext {
  tenant: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    logoPath?: string;
  };
  meeting: {
    title: string;
    date: string;
  };
  agendaItems: { number: string; title: string; summary: string }[];
  decisionsTable: string[][];
}

export async function buildCouncilPackPdf(
  ctx: CouncilPackContext
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
        .title(`Council Pack – ${ctx.meeting.title}`)
        .subtitle(`${ctx.tenant.name} • ${ctx.meeting.date}`)
    )
    .watermark("CONFIDENTIAL")
    .section("Agenda", s =>
      s.columnsLayout(cols =>
        cols.col(100, col =>
          col.text(
            ctx.agendaItems
              .map(
                item =>
                  `${item.number}. ${item.title}\n${item.summary}\n`
              )
              .join("\n")
          )
        )
      )
    )
    .section("Decisions and Recommendations", s =>
      s.table(ctx.decisionsTable)
    );

  return pdf.render();
}
