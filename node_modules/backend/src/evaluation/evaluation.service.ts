import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as PDFDocument from "pdfkit";

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tender Insights
   */
  async getTenderInsights(tenderId: string) {
    return this.prisma.tenderInsights.findUnique({
      where: { tenderId },
    });
  }

  /**
   * Heatmap
   */
  async getRiskHeatmap(tenderId: string) {
    return this.prisma.tenderHeatmap.findUnique({
      where: { tenderId },
    });
  }

  /**
   * Bidder scoring breakdown
   */
  async getBidderScoringBreakdown(tenderId: string, bidderId: string) {
    return this.prisma.bidderScore.findMany({
      where: { tenderId, bidderId },
    });
  }

  /**
   * Bidder Intelligence
   */
  async getBidderIntelligence(bidderId: string) {
    return this.prisma.bidderIntelligence.findUnique({
      where: { bidderId },
    });
  }

  /**
   * Bidder Risk Profile
   */
  async getBidderRiskProfile(bidderId: string) {
    return this.prisma.bidderRiskProfile.findUnique({
      where: { bidderId },
    });
  }

  /**
   * Compliance Dashboard
   */
  async getComplianceDashboard(tenderId: string) {
    return this.prisma.tenderComplianceDashboard.findUnique({
      where: { tenderId },
    });
  }

  /**
   * Council Pack v2 (JSON analytics)
   */
  async getCouncilPackV2(tenderId: string) {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
    });
    if (!tender) return null;

    const bidders = await this.prisma.bidder.findMany({
      where: { tenderId },
    });

    const scoring = await this.prisma.bidderScore.findMany({
      where: { tenderId },
    });

    return {
      tender: {
        id: tender.id,
        number: tender.number,
        description: tender.description,
      },
      bidders: bidders.map((b) => ({
        id: b.id,
        name: b.name,
      })),
      scoring: scoring.map((s) => ({
        bidderId: s.bidderId,
        criterion: s.criterion,
        score: s.score,
      })),
    };
  }

  /**
   * Council Pack v2 PDF
   */
  async generateCouncilPackV2Pdf(tenderId: string): Promise<Buffer | null> {
    const data = await this.getCouncilPackV2(tenderId);
    if (!data) return null;

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {});

    doc.fontSize(18).text("Council Pack v2", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Tender: ${data.tender.number}`);
    doc.text(`Description: ${data.tender.description ?? ""}`);
    doc.moveDown();

    doc.fontSize(14).text("Total Scores per Bidder", { underline: true });
    doc.moveDown();

    const totals = data.bidders.map((b) => {
      const total = data.scoring
        .filter((s) => s.bidderId === b.id)
        .reduce((sum, s) => sum + s.score, 0);
      return { name: b.name, total };
    });

    totals.forEach((t) => {
      doc.fontSize(12).text(`${t.name}: ${t.total}`);
    });

    doc.addPage();
    doc.fontSize(14).text("Detailed Scoring", { underline: true });
    doc.moveDown();

    data.scoring.forEach((s) => {
      const bidder = data.bidders.find((b) => b.id === s.bidderId);
      doc
        .fontSize(11)
        .text(
          `${bidder ? bidder.name : s.bidderId} – ${s.criterion}: ${
            s.score
          }`,
        );
      if (doc.y > 700) doc.addPage();
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  /**
   * CSV/JSON exports
   */
  async exportHeatmapCsv(tenderId: string) {
    const heatmap = await this.getRiskHeatmap(tenderId);
    if (!heatmap) return null;

    const header = "bidder,rule,compliant\n";
    const rows = heatmap.cells
      .map(
        (c) =>
          `${c.bidderName},${c.ruleCode},${c.compliant ? "YES" : "NO"}`,
      )
      .join("\n");

    return header + rows;
  }

  async exportHeatmapJson(tenderId: string) {
    const heatmap = await this.getRiskHeatmap(tenderId);
    return JSON.stringify(heatmap, null, 2);
  }

  async exportBidderIntelligenceCsv(bidderId: string) {
    const intel = await this.getBidderIntelligence(bidderId);
    if (!intel) return null;

    const header = "tender,score,price,awarded,date\n";
    const rows = intel.timeline
      .map(
        (t) =>
          `${t.tenderNumber},${t.totalScore},${t.price},${t.awarded},${t.createdAt}`,
      )
      .join("\n");

    return header + rows;
  }

  async exportBidderIntelligenceJson(bidderId: string) {
    const intel = await this.getBidderIntelligence(bidderId);
    return JSON.stringify(intel, null, 2);
  }

  /**
   * Tender timeline (evaluation side)
   */
  async getTenderTimeline(tenderId: string) {
    return this.prisma.tenderTimelineEvent.findMany({
      where: { tenderId },
      orderBy: { createdAt: "asc" },
    });
  }

  /**
   * Publish evaluation document
   */
  async createEvaluationDocument(tenderId: string) {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
    });
    if (!tender) return null;

    const doc = await this.prisma.evaluationDocument.create({
      data: {
        tenderId,
        runNumber: Date.now(),
        hash: Math.random().toString(36).substring(2),
      },
    });

    return {
      document: doc,
      hash: doc.hash,
    };
  }
}
