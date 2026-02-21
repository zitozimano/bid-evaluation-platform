import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TenderInsightsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(tenderId: string, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const latestRun = await this.prisma.evaluationRun.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });

    if (!latestRun) {
      throw new NotFoundException("No evaluation runs found for this tender.");
    }

    const evaluations = await this.prisma.evaluationResult.findMany({
      where: { tenderId, runId: latestRun.id },
      include: { bidder: true },
      orderBy: { totalScore: "desc" },
    });

    const avgScore =
      evaluations.length === 0
        ? null
        : evaluations.reduce((s, e) => s + e.totalScore, 0) /
          evaluations.length;

    const topBidder = evaluations[0] ?? null;

    const rankings = evaluations.map((e, index) => ({
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

    const payload = {
      tenderId,
      runNumber: latestRun.runNumber,
      runHash: latestRun.runHash ?? null,
      averageScore: avgScore,
      topBidder: topBidder
        ? {
            bidderId: topBidder.bidderId,
            name: topBidder.bidder.name,
            totalScore: topBidder.totalScore,
          }
        : null,
      count: evaluations.length,
      rankings,
    };

    await this.prisma.tenderInsights.upsert({
      where: { tenderId },
      update: { payload },
      create: { tenderId, payload },
    });

    return payload;
  }

  async get(tenderId: string, tenantId: string) {
    const insights = await this.prisma.tenderInsights.findFirst({
      where: { tenderId, tender: { tenantId } },
    });

    if (!insights) {
      throw new NotFoundException("Tender insights not found.");
    }

    return insights;
  }
}
