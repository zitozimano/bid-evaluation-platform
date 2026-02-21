import { Module } from "@nestjs/common";
import { TenderInsightsService } from "./tender-insights.service";
import { TenderInsightsController } from "./tender-insights.controller";
import { HeatmapGenerationService } from "./heatmap-generation.service";
import { HeatmapController } from "./heatmap.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [TenderInsightsController, HeatmapController],
  providers: [
    PrismaService,
    TenderInsightsService,
    HeatmapGenerationService,
  ],
  exports: [TenderInsightsService, HeatmapGenerationService],
})
export class InsightsModule {}
