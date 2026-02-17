import {
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { EvaluationService } from "./evaluation.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("evaluation")
@UseGuards(RolesGuard)
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post("tenders/:tenderId/publish")
  @Roles("SCM", "ADMIN")
  async publishEvaluation(@Param("tenderId") tenderId: string) {
    const result = await this.evaluationService.createEvaluationDocument(
      tenderId,
    );
    if (!result) {
      throw new NotFoundException("Tender not found or no evaluation results");
    }
    return result;
  }

  @Get("tenders/:tenderId/insights")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getTenderInsights(@Param("tenderId") tenderId: string) {
    const insights = await this.evaluationService.getTenderInsights(tenderId);
    if (!insights) throw new NotFoundException("Tender not found");
    return insights;
  }

  @Get("tenders/:tenderId/heatmap")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getRiskHeatmap(@Param("tenderId") tenderId: string) {
    const heatmap = await this.evaluationService.getRiskHeatmap(tenderId);
    if (!heatmap) throw new NotFoundException("Tender not found");
    return heatmap;
  }

  @Get("tenders/:tenderId/timeline")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getTimeline(@Param("tenderId") tenderId: string) {
    const timeline = await this.evaluationService.getTenderTimeline(tenderId);
    if (!timeline) throw new NotFoundException("Tender not found");
    return timeline;
  }

  @Get("tenders/:tenderId/council-pack-v2")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async councilPackV2(@Param("tenderId") tenderId: string) {
    const data = await this.evaluationService.getCouncilPackV2(tenderId);
    if (!data) throw new NotFoundException("Tender not found");
    return data;
  }

  @Get("tenders/:tenderId/council-pack-v2.pdf")
  @Roles("SCM", "CFO", "ADMIN")
  async councilPackV2Pdf(
    @Param("tenderId") tenderId: string,
    @Res() res: Response,
  ) {
    const pdf = await this.evaluationService.generateCouncilPackV2Pdf(
      tenderId,
    );
    if (!pdf) throw new NotFoundException("Tender not found");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="council-pack-v2-${tenderId}.pdf"`,
    );
    res.send(pdf);
  }

  @Get("bidders/:bidderId/intelligence")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getBidderIntelligence(@Param("bidderId") bidderId: string) {
    const intel =
      await this.evaluationService.getBidderIntelligence(bidderId);
    if (!intel) throw new NotFoundException("Bidder not found");
    return intel;
  }

  @Get("bidders/:bidderId/risk-profile")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getBidderRiskProfile(@Param("bidderId") bidderId: string) {
    const profile =
      await this.evaluationService.getBidderRiskProfile(bidderId);
    if (!profile) throw new NotFoundException("Bidder not found");
    return profile;
  }

  @Get("tenders/:tenderId/compliance-dashboard")
  @Roles("SCM", "CFO", "ADMIN", "AUDIT")
  async getComplianceDashboard(@Param("tenderId") tenderId: string) {
    const dashboard =
      await this.evaluationService.getComplianceDashboard(tenderId);
    if (!dashboard) throw new NotFoundException("Tender not found");
    return dashboard;
  }
}
