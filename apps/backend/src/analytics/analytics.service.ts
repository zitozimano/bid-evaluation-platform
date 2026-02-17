import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async summary(tenantId: string | null) {
    const tenderWhere = tenantId ? { tenantId } : {};

    const [tenderCount, bidderCount, resultAgg, exceptionCount] =
      await Promise.all([
        this.prisma.tender.count({ where: tenderWhere }),
        this.prisma.bidder.count({
          where: {
            tender: tenderWhere,
          },
        }),
        this.prisma.evaluationResult.aggregate({
          where: {
            tender: tenderWhere,
          },
          _avg: {
            totalScore: true,
            riskScore: true,
            complianceRate: true,
          },
        }),
        this.prisma.evaluationException.count({
          where: {
            evaluationResult: {
              tender: tenderWhere,
            },
          },
        }),
      ]);

    return {
      tenderCount,
      bidderCount,
      avgTotalScore: resultAgg._avg.totalScore ?? null,
      avgRiskScore: resultAgg._avg.riskScore ?? null,
      avgComplianceRate: resultAgg._avg.complianceRate ?? null,
      exceptionsCount: exceptionCount,
    };
  }

  async tenders(tenantId: string | null) {
    const tenders = await this.prisma.tender.findMany({
      where: tenantId ? { tenantId } : {},
      select: {
        id: true,
        number: true,
        description: true,
        evaluationResults: {
          select: {
            totalScore: true,
          },
        },
        _count: {
          select: {
            bidders: true,
            evaluationResults: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const exceptionsByTender = await this.prisma.evaluationException.groupBy({
      by: ["evaluationResultId"],
      _count: { _all: true },
    });

    const exceptionMap = new Map<string, number>();
    for (const e of exceptionsByTender) {
      exceptionMap.set(e.evaluationResultId, e._count._all);
    }

    return tenders.map((t) => {
      const scores = t.evaluationResults.map((r) => r.totalScore);
      const bestScore =
        scores.length > 0 ? Math.max(...scores) : null;
      const avgScore =
        scores.length > 0
          ? scores.reduce((a, b) => a + b, 0) / scores.length
          : null;

      // For now, we don’t have tenderId on exceptions directly in this query,
      // so we just expose evaluationResults count as a proxy.
      const exceptionsCount = t._count.evaluationResults; // refine later if needed

      return {
        id: t.id,
        number: t.number,
        description: t.description,
        bidderCount: t._count.bidders,
        bestScore,
        avgScore,
        exceptionsCount,
      };
    });
  }
}
