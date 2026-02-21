import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEvaluationConfigDto } from "./dto/create-evaluation-config.dto";
import { UpdateEvaluationConfigDto } from "./dto/update-evaluation-config.dto";
import { ScoringService } from "./scoring/scoring.service";
import { WorkflowLogService } from "./workflow/workflow-log.service";
import * as crypto from "crypto";

@Injectable()
export class EvaluationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoring: ScoringService,
    private readonly workflow: WorkflowLogService,
  ) {}

  private sha256(input: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
  }

  // ───────────────────────────────────────────────
  // CONFIG
  // ───────────────────────────────────────────────

  async getConfig(tenderId: string, tenantId: string) {
    const config = await this.prisma.evaluationConfig.findFirst({
      where: {
        tenderId,
        tender: { tenantId },
      },
    });

    if (!config) {
      throw new NotFoundException("Evaluation config not found.");
    }

    return config;
  }

  async createConfig(dto: CreateEvaluationConfigDto, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: dto.tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const existing = await this.prisma.evaluationConfig.findFirst({
      where: { tenderId: dto.tenderId },
    });

    if (existing) {
      throw new BadRequestException(
        "Evaluation config already exists for this tender.",
      );
    }

    return this.prisma.evaluationConfig.create({
      data: {
        tenderId: dto.tenderId,
        priceWeight: dto.priceWeight,
        bbbeeWeight: dto.bbbeeWeight,
        functionalityPass: dto.functionalityPass,
        functionalityMax: dto.functionalityMax,
        criteria: dto.criteria,
      },
    });
  }

  async updateConfig(
    tenderId: string,
    dto: UpdateEvaluationConfigDto,
    tenantId: string,
  ) {
    const config = await this.prisma.evaluationConfig.findFirst({
      where: {
        tenderId,
        tender: { tenantId },
      },
    });

    if (!config) {
      throw new NotFoundException("Evaluation config not found.");
    }

    return this.prisma.evaluationConfig.update({
      where: { id: config.id },
      data: { ...dto },
    });
  }

  // ───────────────────────────────────────────────
  // RUN FULL EVALUATION (VERSIONED + HASHED)
  // ───────────────────────────────────────────────

  async runEvaluation(tenderId: string, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const config = await this.prisma.evaluationConfig.findFirst({
      where: { tenderId, tender: { tenantId } },
    });

    if (!config) {
      throw new BadRequestException("Evaluation config missing.");
    }

    const bidders = await this.prisma.bidder.findMany({
      where: { tenderId },
    });

    if (bidders.length === 0) {
      throw new BadRequestException("No bidders found for this tender.");
    }

    const lastRun = await this.prisma.evaluationRun.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });

    const nextRunNumber = (lastRun?.runNumber ?? 0) + 1;

    const run = await this.prisma.evaluationRun.create({
      data: {
        tenderId,
        runNumber: nextRunNumber,
      },
    });

    const results = [];
    const resultSummaries: {
      bidderId: string;
      totalScore: number;
      price: number;
      bbbeePoints: number;
      qualifies: boolean;
      riskScore: number | null;
      resultHash: string;
    }[] = [];

    for (const bidder of bidders) {
      const score = await this.scoring.scoreBidder(
        tenderId,
        bidder.id,
        config,
      );

      const totalScore =
        score.priceScore +
        score.bbbeePoints +
        (score.qualifies ? score.functionalityScore : 0);

      const resultPayloadForHash = {
        tenderId,
        bidderId: bidder.id,
        functionalityScore: score.functionalityScore,
        qualifies: score.qualifies,
        price: score.price,
        priceScore: score.priceScore,
        bbbeeLevel: score.bbbeeLevel,
        bbbeePoints: score.bbbeePoints,
        riskScore: score.riskScore ?? null,
        totalScore,
      };

      const resultHash = this.sha256(resultPayloadForHash);

      const result = await this.prisma.evaluationResult.create({
        data: {
          tenderId,
          bidderId: bidder.id,
          runId: run.id,

          functionalityScore: score.functionalityScore,
          qualifies: score.qualifies,

          price: score.price,
          priceScore: score.priceScore,

          bbbeeLevel: score.bbbeeLevel,
          bbbeePoints: score.bbbeePoints,

          riskScore: score.riskScore,

          totalScore,

          hash: resultHash,
        },
      });

      await this.workflow.logStage(result.id, "EVALUATED", 0);

      results.push(result);
      resultSummaries.push({
        bidderId: bidder.id,
        totalScore,
        price: score.price,
        bbbeePoints: score.bbbeePoints,
        qualifies: score.qualifies,
        riskScore: score.riskScore ?? null,
        resultHash,
      });
    }

    const runPayloadForHash = {
      tenderId,
      runNumber: run.runNumber,
      results: resultSummaries.sort((a, b) => b.totalScore - a.totalScore),
    };

    const runHash = this.sha256(runPayloadForHash);

    const updatedRun = await this.prisma.evaluationRun.update({
      where: { id: run.id },
      data: { runHash },
    });

    return {
      runId: updatedRun.id,
      runNumber: updatedRun.runNumber,
      runHash: updatedRun.runHash,
      tenderId,
      count: results.length,
      results,
    };
  }

  // ───────────────────────────────────────────────
  // LIST RUNS
  // ───────────────────────────────────────────────

  async listRuns(tenderId: string, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    return this.prisma.evaluationRun.findMany({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });
  }

  // ───────────────────────────────────────────────
  // COMPARE RUNS
  // ───────────────────────────────────────────────

  async compareRuns(
    tenderId: string,
    runANumber: number,
    runBNumber: number,
    tenantId: string,
  ) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const [runA, runB] = await Promise.all([
      this.prisma.evaluationRun.findFirst({
        where: { tenderId, runNumber: runANumber },
      }),
      this.prisma.evaluationRun.findFirst({
        where: { tenderId, runNumber: runBNumber },
      }),
    ]);

    if (!runA || !runB) {
      throw new NotFoundException("One or both runs not found.");
    }

    const [resultsA, resultsB] = await Promise.all([
      this.prisma.evaluationResult.findMany({
        where: { tenderId, runId: runA.id },
        include: { bidder: { select: { name: true } } },
      }),
      this.prisma.evaluationResult.findMany({
        where: { tenderId, runId: runB.id },
        include: { bidder: { select: { name: true } } },
      }),
    ]);

    const mapByBidder = (results: any[]) =>
      new Map(results.map((r) => [r.bidderId, r]));

    const mapA = mapByBidder(resultsA);
    const mapB = mapByBidder(resultsB);

    const allBidderIds = new Set<string>([
      ...Array.from(mapA.keys()),
      ...Array.from(mapB.keys()),
    ]);

    const deltas = Array.from(allBidderIds).map((bidderId) => {
      const a = mapA.get(bidderId);
      const b = mapB.get(bidderId);

      return {
        bidderId,
        bidderName: a?.bidder?.name ?? b?.bidder?.name ?? "Unknown",
        from: a
          ? {
              totalScore: a.totalScore,
              qualifies: a.qualifies,
            }
          : null,
        to: b
          ? {
              totalScore: b.totalScore,
              qualifies: b.qualifies,
            }
          : null,
      };
    });

    return {
      tenderId,
      runA: { id: runA.id, runNumber: runA.runNumber, runHash: runA.runHash },
      runB: { id: runB.id, runNumber: runB.runNumber, runHash: runB.runHash },
      deltas,
    };
  }
}
