import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HeatmapGenerationService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(tenderId: string, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const evaluations = await this.prisma.evaluationResult.findMany({
      where: { tenderId },
      include: { bidder: true },
    });

    const cells = evaluations.map((e) => ({
      bidderId: e.bidderId,
      bidderName: e.bidder.name,
      totalScore: e.totalScore,
      riskScore: e.riskScore,
      complianceRate: e.complianceRate,
    }));

    await this.prisma.tenderHeatmap.upsert({
      where: { tenderId },
      update: { cells },
      create: { tenderId, cells },
    });

    return cells;
  }

  async get(tenderId: string, tenantId: string) {
    const heatmap = await this.prisma.tenderHeatmap.findFirst({
      where: { tenderId, tender: { tenantId } },
    });

    if (!heatmap) {
      throw new NotFoundException("Heatmap not found.");
    }

    return heatmap;
  }
}
