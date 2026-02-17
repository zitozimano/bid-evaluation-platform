import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { computeComplianceRateFromCounts } from "../analytics/compliance.util";

@Injectable()
export class EvidenceService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------------------------------------
  //  GET ALL EVIDENCE FOR A BIDDER
  // ------------------------------------------------------
  async getEvidenceForBidder(bidderId: string) {
    return this.prisma.evidence.findMany({
      where: { bidderId },
      orderBy: { createdAt: "desc" },
    });
  }

  // ------------------------------------------------------
  //  ADD EVIDENCE
  // ------------------------------------------------------
  async addEvidence(
    bidderId: string,
    type: string,
    url: string,
    metadata?: any
  ) {
    return this.prisma.evidence.create({
      data: {
        bidderId,
        type,
        url,
        metadata,
      },
    });
  }

  // ------------------------------------------------------
  //  DELETE EVIDENCE
  // ------------------------------------------------------
  async deleteEvidence(id: string) {
    return this.prisma.evidence.delete({
      where: { id },
    });
  }

  // ------------------------------------------------------
  //  GET LATEST RUN (EvaluationDocument)
  // ------------------------------------------------------
  async getLatestRun(tenderId: string) {
    return this.prisma.evaluationDocument.findFirst({
      where: { tenderId },
      orderBy: { runNumber: "desc" },
    });
  }

  // ------------------------------------------------------
  //  GET RANKING (no evaluationRanking table)
  // ------------------------------------------------------
  async getRanking(tenderId: string) {
    const results = await this.prisma.evaluationResult.findMany({
      where: { tenderId },
      orderBy: { totalScore: "desc" },
      include: { bidder: true },
    });

    let rank = 1;
    return results.map((r) => ({
      rank: rank++,
      bidder: r.bidder.name,
      totalScore: r.totalScore,
      qualifies: r.qualifies,
      priceScore: r.priceScore,
      functionalityScore: r.functionalityScore,
      bbbeePoints: r.bbbeePoints,
    }));
  }

  // ------------------------------------------------------
  //  COMPLIANCE RATE (manual boolean aggregation)
  // ------------------------------------------------------
  async computeComplianceRate(tenderId: string) {
    const total = await this.prisma.complianceItem.count({
      where: { evaluationResult: { tenderId } },
    });

    const compliant = await this.prisma.complianceItem.count({
      where: {
        evaluationResult: { tenderId },
        compliant: true,
      },
    });

    return computeComplianceRateFromCounts(total, compliant);
  }

  // ------------------------------------------------------
  //  GET FULL EVIDENCE SUMMARY FOR TENDER
  // ------------------------------------------------------
  async getTenderEvidenceSummary(tenderId: string) {
    const bidders = await this.prisma.bidder.findMany({
      where: { tenderId },
      include: {
        evidence: true,
        evaluationResults: true,
      },
    });

    const complianceRate = await this.computeComplianceRate(tenderId);
    const ranking = await this.getRanking(tenderId);
    const latestRun = await this.getLatestRun(tenderId);

    return {
      tenderId,
      latestRun,
      complianceRate,
      ranking,
      bidders: bidders.map((b) => ({
        bidderId: b.id,
        name: b.name,
        evidenceCount: b.evidence.length,
        evaluation: b.evaluationResults[0] ?? null,
      })),
    };
  }

  // ------------------------------------------------------
  //  GET EVIDENCE + SCORING FOR A SINGLE BIDDER
  // ------------------------------------------------------
  async getBidderEvidenceSummary(bidderId: string) {
    const bidder = await this.prisma.bidder.findUnique({
      where: { id: bidderId },
      include: {
        evidence: true,
        evaluationResults: true,
      },
    });

    if (!bidder) throw new Error("Bidder not found");

    const result = bidder.evaluationResults[0] ?? null;

    return {
      bidderId: bidder.id,
      name: bidder.name,
      evidence: bidder.evidence,
      evaluation: result
        ? {
            totalScore: result.totalScore,
            functionalityScore: result.functionalityScore,
            priceScore: result.priceScore,
            bbbeePoints: result.bbbeePoints,
            qualifies: result.qualifies,
            riskScore: result.riskScore,
            complianceRate: result.complianceRate,
            exceptionsCount: result.exceptionsCount,
            slaBreached: result.slaBreached,
            currentStage: result.currentStage,
          }
        : null,
    };
  }
}
