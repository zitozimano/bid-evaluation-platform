import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

type EvaluationConfigLike = {
  priceWeight: number;
  bbbeeWeight: number;
  functionalityPass: number;
  functionalityMax: number;
};

@Injectable()
export class ScoringService {
  constructor(private readonly prisma: PrismaService) {}

  async scoreBidder(
    tenderId: string,
    bidderId: string,
    config: EvaluationConfigLike,
  ) {
    const bidder = await this.prisma.bidder.findUnique({
      where: { id: bidderId },
      include: { bbbee: true },
    });

    if (!bidder) {
      throw new NotFoundException("Bidder not found.");
    }

    const functionalityScore = config.functionalityMax;
    const qualifies = functionalityScore >= config.functionalityPass;

    const allBidders = await this.prisma.bidder.findMany({
      where: { tenderId },
    });

    const prices = allBidders
      .map((b) => b.price)
      .filter((p): p is number => p !== null && p !== undefined);

    const minPrice = prices.length ? Math.min(...prices) : bidder.price ?? 0;
    const price = bidder.price ?? 0;

    const priceScore =
      price && minPrice
        ? (minPrice / price) * config.priceWeight
        : 0;

    const level = bidder.bbbee?.level ?? null;
    const bbbeePoints =
      level && level > 0 ? config.bbbeeWeight / level : 0;

    const riskScore = 0;

    return {
      functionalityScore,
      qualifies,
      price,
      priceScore,
      bbbeeLevel: level,
      bbbeePoints,
      riskScore,
    };
  }
}
