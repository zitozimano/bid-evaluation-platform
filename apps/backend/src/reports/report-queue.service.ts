import { Injectable } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CouncilZipService } from "./council-zip.service";

@Injectable()
export class ReportQueueService {
  constructor(
    private reports: ReportsService,
    private reportsZip: CouncilZipService,
  ) {}

  async process(job: any) {
    const { type, userId, tenderId, meetingId, periodId } = job.data;

    switch (type) {
      case "EVALUATION_REPORT":
        return await this.reports.buildEvaluationReport(userId, tenderId);

      case "COUNCIL_PACK":
        return await this.reports.buildCouncilPack(userId, meetingId);

      case "AUDIT_PACK":
        return await this.reports.buildAuditPack(userId, periodId);

      case "TENDER_SUMMARY":
        return await this.reports.buildTenderSummary(userId, tenderId);

      case "COUNCIL_ZIP":
        return await this.reportsZip.generateCouncilZip(tenderId);

      default:
        throw new Error(`Unknown report type: ${type}`);
    }
  }
}
