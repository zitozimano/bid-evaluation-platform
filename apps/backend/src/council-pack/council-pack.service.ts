import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CouncilPackService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(tenderId: string, tenantId?: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId: tenantId ?? undefined },
    });

    if (!tender) {
      throw new BadRequestException("Tender not found in tenant");
    }

    const latestRun = await this.prisma.evaluationRun.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });

    if (!latestRun) {
      throw new BadRequestException("No evaluation runs found for this tender");
    }

    const evaluationResults = await this.prisma.evaluationResult.findMany({
      where: { tenderId, runId: latestRun.id },
      include: {
        compliance: true,
        exceptions: true,
        workflowLogs: true,
        bidder: true,
      },
      orderBy: { totalScore: "desc" },
    });

    const rankings = evaluationResults.map((e, index) => ({
      rank: index + 1,
      bidderId: e.bidderId,
      bidderName: e.bidder?.name ?? "Unknown",
      totalScore: e.totalScore,
      qualifies: e.qualifies,
      price: e.price,
      priceScore: e.priceScore,
      bbbeeLevel: e.bbbeeLevel,
      bbbeePoints: e.bbbeePoints,
      riskScore: e.riskScore,
    }));

    const signatures = await this.prisma.evaluationSignature.findMany({
      where: { tenderId },
    });

    const insights = await this.prisma.tenderInsights.findUnique({
      where: { tenderId },
    });

    const heatmap = await this.prisma.tenderHeatmap.findUnique({
      where: { tenderId },
    });

    const scmAssignments = await this.prisma.scmTenderAssignment.findMany({
      where: { tenderId },
      include: { user: true },
    });

    const timeline = await this.prisma.tenderTimelineEvent.findMany({
      where: { tenderId },
      orderBy: { createdAt: "asc" },
    });

    const pdfUrl = `/council-pack/${tenderId}-${Date.now()}.pdf`;

    const pack = await this.prisma.councilPack.create({
      data: {
        tenderId,
        url: pdfUrl,
      },
    });

    return {
      message: "Council pack generated",
      pdfUrl,
      packId: pack.id,
      tender,
      runNumber: latestRun.runNumber,
      runHash: latestRun.runHash ?? null,
      evaluationResults,
      rankings,
      signatures,
      insights,
      heatmap,
      scmAssignments,
      timeline,
    };
  }

  async list(tenantId?: string) {
    return this.prisma.councilPack.findMany({
      where: tenantId ? { tender: { tenantId } } : {},
      orderBy: { createdAt: "desc" },
      include: {
        tender: true,
      },
    });
  }
}
