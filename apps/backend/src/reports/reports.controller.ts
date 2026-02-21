import { Controller, Get, Param } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CouncilZipService } from "./council-zip.service";

@Controller("reports")
export class ReportsController {
  constructor(
    private reports: ReportsService,
    private reportsZip: CouncilZipService,
  ) {}

  @Get("tenders/:id/evaluation")
  async evaluation(@Param("id") tenderId: string) {
    const buffer = await this.reports.generateEvaluationReport(tenderId);
    return buffer;
  }

  @Get("tenders/:id/summary")
  async summary(@Param("id") tenderId: string) {
    const buffer = await this.reports.generateTenderSummary(tenderId);
    return buffer;
  }

  @Get("tenders/:id/council-pack")
  async councilPack(@Param("id") tenderId: string) {
    const buffer = await this.reports.generateCouncilPackByTender(tenderId);
    return buffer;
  }

  @Get("tenders/:id/council-zip")
  async councilZip(@Param("id") tenderId: string) {
    const url = await this.reportsZip.generateCouncilZip(tenderId);
    return { url };
  }
}
