import { EvaluationResult, Bidder } from "@prisma/client";

export function rankEvaluationResults(
  results: EvaluationResult[],
  bidders: Bidder[]
) {
  const bidderMap = new Map<string, Bidder>();
  bidders.forEach((b) => bidderMap.set(b.id, b));

  const sorted = [...results].sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (a.price !== b.price) return a.price - b.price;
    return (b.bbbeePoints ?? 0) - (a.bbbeePoints ?? 0);
  });

  return sorted.map((res, index) => {
    const bidder = bidderMap.get(res.bidderId);

    return {
      bidderId: res.bidderId,
      name: bidder?.name ?? "Unknown bidder",
      tenderId: res.tenderId,
      totalScore: res.totalScore,
      functionalityScore: res.functionalityScore,
      price: res.price,
      priceScore: res.priceScore,
      bbbeeLevel: res.bbbeeLevel,
      bbbeePoints: res.bbbeePoints,
      qualifies: res.qualifies,
      rank: index + 1,
    };
  });
}
