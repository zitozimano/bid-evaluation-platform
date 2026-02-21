// Keep this file decoupled from Prisma's internal types.
// We only care about the shape we actually use.

export type EvaluationResultLike = {
  exceptionsCount: number;
  slaBreached: boolean;
  riskScore: number | null;
};

export function computeRiskScore(result: EvaluationResultLike): number {
  let score = 0;

  if (result.exceptionsCount > 0) score += 10;
  if (result.slaBreached) score += 20;
  if (result.riskScore) score += result.riskScore;

  return score;
}
