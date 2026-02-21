import "reflect-metadata";
import * as fs from "fs";
import { buildEvaluationReportPdf } from "../src/reports/templates/v3/evaluation-report.template";
import { buildCouncilPackPdf } from "../src/reports/templates/v3/council-pack.template";
import { buildAuditPackPdf } from "../src/reports/templates/v3/audit-pack.template";
import { buildTenderSummaryPdf } from "../src/reports/templates/v3/tender-summary.template";

async function run() {
  try {
    // ---------------------------------------------------------
    // MOCK TENANT (self-contained)
    // ---------------------------------------------------------
    const tenant = {
      name: "Smoke Test Tenant",
      primaryColor: "#003366",
      secondaryColor: "#999999",
      logoPath: undefined,
    };

    // ---------------------------------------------------------
    // MOCK TENDER
    // ---------------------------------------------------------
    const tender = {
      number: "TDR-SMOKE-001",
      description: "Smoke Test Tender",
      department: "Infrastructure",
      budget: "R1,000,000",
    };

    // ---------------------------------------------------------
    // MOCK TABLES
    // ---------------------------------------------------------
    const summaryTable = [
      ["Criteria", "Score"],
      ["Functionality", "85"],
      ["Price", "90"],
      ["BEE", "100"],
    ];

    const rankingsTable = [
      ["Rank", "Bidder", "Score"],
      ["1", "ABC Holdings", "92"],
      ["2", "XYZ Group", "88"],
    ];

    const decisionsTable = [
      ["Item", "Decision"],
      ["1", "Approved"],
      ["2", "Deferred"],
    ];

    const findingsTable = [
      ["Finding", "Severity"],
      ["Irregular Expenditure", "High"],
      ["Missing Documentation", "Medium"],
    ];

    const actionsTable = [
      ["Action", "Responsible", "Due Date"],
      ["Fix SCM controls", "CFO", "2026-03-31"],
    ];

    const biddersTable = [
      ["Bidder", "Price", "Score"],
      ["ABC Holdings", "R1,200,000", "92"],
      ["XYZ Group", "R1,350,000", "88"],
    ];

    // ---------------------------------------------------------
    // GENERATE PDFs
    // ---------------------------------------------------------

    const evalPdf = await buildEvaluationReportPdf({
      tenant,
      tender,
      summaryTable,
      rankingsTable,
    });
    fs.writeFileSync("ci-eval-smoke.pdf", await toBuffer(evalPdf));

    const councilPdf = await buildCouncilPackPdf({
      tenant,
      meeting: {
        title: "Smoke Test Council Meeting",
        date: "2026-01-01",
      },
      agendaItems: [
        { number: "1", title: "Opening", summary: "Meeting opened." },
        { number: "2", title: "Budget Review", summary: "Discussed budget." },
      ],
      decisionsTable,
    });
    fs.writeFileSync("ci-council-smoke.pdf", await toBuffer(councilPdf));

    const auditPdf = await buildAuditPackPdf({
      tenant,
      period: { label: "2025/2026" },
      findingsTable,
      actionsTable,
    });
    fs.writeFileSync("ci-audit-smoke.pdf", await toBuffer(auditPdf));

    const summaryPdf = await buildTenderSummaryPdf({
      tenant,
      tender,
      biddersTable,
    });
    fs.writeFileSync("ci-summary-smoke.pdf", await toBuffer(summaryPdf));

    console.log("PDF smoke test completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("PDF smoke test failed:", err);
    process.exit(1);
  }
}

function toBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise(resolve => {
    const chunks: Buffer[] = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

run();
