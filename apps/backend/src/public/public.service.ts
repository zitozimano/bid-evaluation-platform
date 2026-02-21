import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import PDFDocument = require("pdfkit");
import { RequestContextService } from "../common/tenant/request-context.service";
import {
  CouncilPackDto,
  PublishedTenderItemDto,
  PublishedTenderListDto,
  TenderSummaryDto,
  VerifyHashDto,
  VerifyRunDto,
} from "./dto/public.dto";

type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

type EvaluationResultWithBidder = Prisma.EvaluationResultGetPayload<{
  include: { bidder: true };
}>;

type EvaluationResultForVerify = Prisma.EvaluationResultGetPayload<{
  include: {
    bidder: { select: { name: true } };
    run: true;
    tender: { select: { tenantId: true } };
  };
}>;

@Injectable()
export class PublicService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly cacheTtlMs = 60_000; // 60 seconds

  constructor(
    private readonly prisma: PrismaService,
    private readonly context: RequestContextService,
  ) {}

  // ─────────────────────────────────────────────
  // Cache helpers
  // ─────────────────────────────────────────────

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value as T;
  }

  private setCache<T>(key: string, value: T, ttlMs: number = this.cacheTtlMs) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  private get tenantId(): string | null {
    return this.context.tenantId;
  }

  // ─────────────────────────────────────────────
  // Public Tender Summary
  // ─────────────────────────────────────────────

  async getTenderSummary(tenderId: string): Promise<TenderSummaryDto | null> {
    const effectiveTenantId = this.tenantId;
    const cacheKey = `tenderSummary:${effectiveTenantId ?? "null"}:${tenderId}`;
    const cached = this.getFromCache<TenderSummaryDto | null>(cacheKey);
    if (cached !== null) return cached;

    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
      include: {
        complianceDashboard: true,
      },
    });

    if (!tender) {
      this.setCache(cacheKey, null);
      return null;
    }

    if (effectiveTenantId && tender.tenantId !== effectiveTenantId) {
      this.setCache(cacheKey, null);
      return null;
    }

    const latestRun = await this.prisma.evaluationRun.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });

    let evaluationResults: EvaluationResultWithBidder[] = [];
    const rankings: TenderSummaryDto["rankings"] = [];
    let runNumber: number | null = null;
    let runHash: string | null = null;

    if (latestRun) {
      runNumber = latestRun.runNumber;
      runHash = latestRun.runHash ?? null;

      evaluationResults = await this.prisma.evaluationResult.findMany({
        where: { tenderId, runId: latestRun.id },
        include: { bidder: true },
        orderBy: { totalScore: "desc" },
      });

      evaluationResults.forEach((e, index) => {
        rankings.push({
          rank: index + 1,
          bidderId: e.bidderId,
          bidderName: e.bidder?.name ?? "Unknown",
          totalScore: e.totalScore,
        });
      });
    }

    const dto: TenderSummaryDto = {
      id: tender.id,
      number: tender.number,
      name: tender.name,
      stage: tender.stage,
      runNumber,
      runHash,
      evaluationResults: evaluationResults.map((e) => ({
        bidderName: e.bidder.name,
        totalScore: e.totalScore,
      })),
      rankings,
      complianceDashboard: tender.complianceDashboard?.payload ?? null,
    };

    this.setCache(cacheKey, dto);
    return dto;
  }

  // ─────────────────────────────────────────────
  // Latest Council Pack
  // ─────────────────────────────────────────────

  async getLatestCouncilPack(tenderId: string): Promise<CouncilPackDto | null> {
    const effectiveTenantId = this.tenantId;
    const cacheKey = `latestCouncilPack:${effectiveTenantId ?? "null"}:${tenderId}`;
    const cached = this.getFromCache<CouncilPackDto | null>(cacheKey);
    if (cached !== null) return cached;

    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
      select: { id: true, tenantId: true },
    });

    if (!tender) {
      this.setCache(cacheKey, null);
      return null;
    }

    if (effectiveTenantId && tender.tenantId !== effectiveTenantId) {
      this.setCache(cacheKey, null);
      return null;
    }

    const pack = await this.prisma.councilPack.findFirst({
      where: { tenderId },
      orderBy: { createdAt: "desc" },
    });

    if (!pack) {
      this.setCache(cacheKey, null);
      return null;
    }

    const dto: CouncilPackDto = {
      tenderId,
      url: pack.url,
      createdAt: pack.createdAt,
    };

    this.setCache(cacheKey, dto);
    return dto;
  }

  // ─────────────────────────────────────────────
  // List Published Tenders
  // ─────────────────────────────────────────────

  async listPublishedTenders(options?: {
    page?: number;
    pageSize?: number;
    departmentId?: string;
    categoryId?: string;
    year?: number;
  }): Promise<PublishedTenderListDto> {
    const {
      page = 1,
      pageSize = 20,
      departmentId,
      categoryId,
      year,
    } = options ?? {};

    const effectiveTenantId = this.tenantId;

    const where: Prisma.TenderWhereInput = {
      category: { name: "PUBLISHED" },
    };

    if (effectiveTenantId) where.tenantId = effectiveTenantId;
    if (departmentId) where.departmentId = departmentId;
    if (categoryId) where.categoryId = categoryId;

    if (year) {
      const from = new Date(year, 0, 1);
      const to = new Date(year + 1, 0, 1);
      where.createdAt = { gte: from, lt: to };
    }

    const cacheKey = `publishedTenders:${JSON.stringify({
      where,
      page,
      pageSize,
    })}`;
    const cached = this.getFromCache<PublishedTenderListDto>(cacheKey);
    if (cached) return cached;

    const [total, tenders] = await Promise.all([
      this.prisma.tender.count({ where }),
      this.prisma.tender.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const items: PublishedTenderItemDto[] = [];

    for (const t of tenders) {
      const latestRun = await this.prisma.evaluationRun.findFirst({
        where: { tenderId: t.id },
        orderBy: { runNumber: "desc" },
      });

      let topBidder: string | null = null;
      let runNumber: number | null = null;
      let runHash: string | null = null;

      if (latestRun) {
        runNumber = latestRun.runNumber;
        runHash = latestRun.runHash ?? null;

        const evals = await this.prisma.evaluationResult.findMany({
          where: { tenderId: t.id, runId: latestRun.id },
          include: { bidder: true },
          orderBy: { totalScore: "desc" },
          take: 1,
        });

        const first = evals[0];
        topBidder = first?.bidder?.name ?? null;
      }

      items.push({
        id: t.id,
        number: t.number,
        description: t.description ?? null,
        publishedAt: t.updatedAt,
        runNumber,
        runHash,
        topBidder,
      });
    }

    const dto: PublishedTenderListDto = {
      items,
      page,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize),
    };

    this.setCache(cacheKey, dto);
    return dto;
  }

  // ─────────────────────────────────────────────
  // Generate Tender Award PDF
  // ─────────────────────────────────────────────

  async generateTenderAwardPdf(tenderNumber: string): Promise<Buffer> {
    const effectiveTenantId = this.tenantId;

    const tender = await this.prisma.tender.findFirst({
      where: { number: tenderNumber },
    });

    if (!tender) {
      throw new NotFoundException("Tender not found.");
    }

    if (effectiveTenantId && tender.tenantId !== effectiveTenantId) {
      throw new NotFoundException("Tender not found.");
    }

    const latestRun = await this.prisma.evaluationRun.findFirst({
      where: { tenderId: tender.id },
      orderBy: { runNumber: "desc" },
    });

    const evaluationResults: EvaluationResultWithBidder[] = latestRun
      ? await this.prisma.evaluationResult.findMany({
          where: { tenderId: tender.id, runId: latestRun.id },
          include: { bidder: true },
          orderBy: { totalScore: "desc" },
        })
      : [];

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    return await new Promise<Buffer>((resolve, reject) => {
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc.fontSize(18).text("Tender Award Notice", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Tender: ${tender.number}`);
      doc.text(`Description: ${tender.description}`);
      doc.text(`Published: ${tender.updatedAt.toISOString()}`);
      if (latestRun) {
        doc.text(`Evaluation Run: ${latestRun.runNumber}`);
        if (latestRun.runHash) {
          doc.text(`Run Hash: ${latestRun.runHash}`);
        }
      }
      doc.moveDown();

      doc.fontSize(14).text("Awarded Bidder", { underline: true });

      const winner = evaluationResults[0];

      if (winner) {
        doc.fontSize(12).text(`Bidder: ${winner.bidder.name}`);
        doc.text(`Total Score: ${winner.totalScore}`);
        doc.text(`Price: ${winner.price}`);
      } else {
        doc.fontSize(12).text("No evaluation results available.");
      }

      doc.moveDown();
      doc.fontSize(10).text("Generated by Bid Evaluation Platform");

      doc.end();
    });
  }

  // ─────────────────────────────────────────────
  // Hash verification
  // ─────────────────────────────────────────────

  async verifyTenderHash(
    tenderId: string,
    hash: string,
  ): Promise<VerifyHashDto> {
    const effectiveTenantId = this.tenantId;
    const cacheKey = `verifyTenderHash:${effectiveTenantId ?? "null"}:${tenderId}:${hash}`;
    const cached = this.getFromCache<VerifyHashDto>(cacheKey);
    if (cached) return cached;

    const result = await this.prisma.evaluationResult.findFirst({
      where: { tenderId, hash },
      include: {
        bidder: { select: { name: true } },
        run: true,
        tender: { select: { tenantId: true } },
      },
    });

    if (!result) {
      const dto: VerifyHashDto = {
        verified: false,
        tenderId,
        hash,
        runNumber: null,
        runHash: null,
        bidderId: null,
        bidderName: null,
        totalScore: null,
        qualifies: null,
      };
      this.setCache(cacheKey, dto);
      return dto;
    }

    const typedResult = result as EvaluationResultForVerify;

    if (effectiveTenantId && typedResult.tender.tenantId !== effectiveTenantId) {
      const dto: VerifyHashDto = {
        verified: false,
        tenderId,
        hash,
        runNumber: null,
        runHash: null,
        bidderId: null,
        bidderName: null,
        totalScore: null,
        qualifies: null,
      };
      this.setCache(cacheKey, dto);
      return dto;
    }

    const dto: VerifyHashDto = {
      verified: true,
      tenderId,
      hash,
      runNumber: typedResult.run?.runNumber ?? null,
      runHash: typedResult.run?.runHash ?? null,
      bidderId: typedResult.bidderId,
      bidderName: typedResult.bidder?.name ?? "Unknown",
      totalScore: typedResult.totalScore,
      qualifies: typedResult.qualifies,
    };

    this.setCache(cacheKey, dto);
    return dto;
  }

  // ─────────────────────────────────────────────
  // Run-level verification
  // ─────────────────────────────────────────────

  async verifyRun(tenderId: string, runNumber: number): Promise<VerifyRunDto> {
    const effectiveTenantId = this.tenantId;
    const cacheKey = `verifyRun:${effectiveTenantId ?? "null"}:${tenderId}:${runNumber}`;
    const cached = this.getFromCache<VerifyRunDto>(cacheKey);
    if (cached) return cached;

    const run = await this.prisma.evaluationRun.findFirst({
      where: { tenderId, runNumber },
    });

    if (!run) {
      const dto: VerifyRunDto = {
        verified: false,
        tenderId,
        runNumber,
        runHash: null,
        resultCount: 0,
      };
      this.setCache(cacheKey, dto);
      return dto;
    }

    if (effectiveTenantId) {
      const tender = await this.prisma.tender.findUnique({
        where: { id: run.tenderId },
        select: { tenantId: true },
      });

      if (!tender || tender.tenantId !== effectiveTenantId) {
        const dto: VerifyRunDto = {
          verified: false,
          tenderId,
          runNumber,
          runHash: null,
          resultCount: 0,
        };
        this.setCache(cacheKey, dto);
        return dto;
      }
    }

    const results = await this.prisma.evaluationResult.findMany({
      where: { tenderId, runId: run.id },
      orderBy: { totalScore: "desc" },
    });

    const dto: VerifyRunDto = {
      verified: true,
      tenderId,
      runNumber: run.runNumber,
      runHash: run.runHash ?? null,
      resultCount: results.length,
    };

    this.setCache(cacheKey, dto);
    return dto;
  }
}
