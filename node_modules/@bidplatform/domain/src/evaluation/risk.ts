export type RiskFactor = {
  id: string;
  label: string;
  score: number; // 0–100
};

export function computeRiskAdjustment(factors: RiskFactor[]) {
  const avg = factors.reduce((a, b) => a + b.score, 0) / factors.length;

  if (avg < 35) return 1.0;   // low risk → no penalty
  if (avg < 70) return 0.95;  // medium risk → -5%
  return 0.85;                // high risk → -15%
}
