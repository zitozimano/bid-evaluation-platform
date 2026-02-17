export type CriterionScore = {
  criterionId: string;
  score: number;   // 0–100
  weight: number;  // percentage
};

export function computeWeightedScore(score: number, weight: number) {
  return (score * weight) / 100;
}

export function computeBidTotal(scores: CriterionScore[]) {
  return scores.reduce(
    (acc, s) => acc + computeWeightedScore(s.score, s.weight),
    0
  );
}
