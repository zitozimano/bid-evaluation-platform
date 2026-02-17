import { EvaluationResult } from "@prisma/client";

export function buildRiskProfile(result: EvaluationResult) {
  const base = result.riskScore ?? 0;

  const compliancePenalty =
    result.complianceRate != null ? (1 - result.complianceRate) * 20 : 0;

  const exceptionsPenalty = result.exceptionsCount * 2;

  const slaPenalty = result.slaBreached ? 15 : 0;

  const finalRisk = Math.min(
    100,
    Math.max(0, base + compliancePenalty + exceptionsPenalty + slaPenalty)
  );

  return {
    bidderId: result.bidderId,
    tenderId: result.tenderId,
    riskScore: finalRisk,
    complianceRate: result.complianceRate,
    exceptionsCount: result.exceptionsCount,
    slaBreached: result.slaBreached,
    currentStage: result.currentStage,
  };
}
