export type EvaluationResultLike = {
  totalScore: number;
  bidder?: {
    name: string | null;
  } | null;
};

export function rankEvaluations(results: EvaluationResultLike[]) {
  return results
    .slice()
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((r, index) => ({
      rank: index + 1,
      bidderName: r.bidder?.name ?? "Unknown",
      totalScore: r.totalScore,
    }));
}
