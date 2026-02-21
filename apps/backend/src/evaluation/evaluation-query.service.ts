import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

interface SummaryCacheEntry {
  expiresAt: number;
  value: any;
}

@Injectable()
export class EvaluationQueryService {
  constructor(private readonly prisma: PrismaService) {}

  // simple in‑memory cache: key -> summary
  private summaryCache = new Map<string, SummaryCacheEntry>();
  private readonly SUMMARY_TTL_MS = 60_000; // 60 seconds

  private makeCacheKey(tenderId: string, tenantId?: string) {
    return `${tenderId}::${tenantId ?? "public"}`;
  }

  // Latest run for a tender (optionally tenant‑scoped)
  async getLatestRun(tenderId: string, tenantId?: string) {
    const tender = await this.prisma.tender.findFirst({
      where: tenantId ? { id: tenderId, tenantId } : { id: tenderId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found or not in tenant.");
    }

    const run = await this.prisma.evaluationRun.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });

    if (!run) {
      throw new NotFoundException("No evaluation runs found for this tender.");
    }

    return run;
  }

  // Latest run + results (ranked)
  async getLatestRunWithResults(tenderId: string, tenantId?: string) {
    const run = await this.getLatestRun(tenderId, tenantId);

    const results = await this.prisma.evaluationResult.findMany({
      where: { tenderId, runId: run.id },
      include: { bidder: true },
      orderBy: { totalScore: "desc" },
    });

    return { run, results };
  }

  // Summary payload for reporting (with caching)
  async getLatestSummary(tenderId: string, tenantId?: string) {
    const key = this.makeCacheKey(tenderId, tenantId);
    const now = Date.now();

    const cached = this.summaryCache.get(key);
    if (cached && cached.expiresAt > now) {
      return cached.value;
    }

    const { run, results } = await this.getLatestRunWithResults(tenderId, tenantId);

    const rankings = results.map((e, index) => ({
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

    const summary = {
      tenderId,
      runId: run.id,
      runNumber: run.runNumber,
      runHash: run.runHash ?? null,
      count: results.length,
      rankings,
    };

    this.summaryCache.set(key, {
      value: summary,
      expiresAt: now + this.SUMMARY_TTL_MS,
    });

    return summary;
  }
}
