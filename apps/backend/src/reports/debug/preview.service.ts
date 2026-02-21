import { Injectable } from "@nestjs/common";
import { buildEvaluationReportPdf } from "../templates/v3/evaluation-report.template";
import { ReportDebugFlags } from "./debug-flags";
import * as fs from "fs";

@Injectable()
export class ReportPreviewService {
  async previewEvaluationReport() {
    ReportDebugFlags.enable(); // turn on debug overlays

    const pdf = await buildEvaluationReportPdf({
      tenant: {
        name: "Preview Tenant",
        primaryColor: "#003366",
        secondaryColor: "#999999",
        logoPath: undefined,
      },
      tender: {
        number: "TDR-001",
        description: "Preview Tender Description",
      },
      summaryTable: [
        ["Criteria", "Score"],
        ["Functionality", "85"],
        ["Price", "90"],
      ],
      rankingsTable: [
        ["Rank", "Bidder", "Score"],
        ["1", "ABC Holdings", "92"],
        ["2", "XYZ Group", "88"],
      ],
    });

    const filePath = "preview-evaluation-report.pdf";
    pdf.pipe(fs.createWriteStream(filePath));

    return filePath;
  }
}
