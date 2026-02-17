import { Module } from "@nestjs/common";
import { TendersController } from "./tenders.controller";
import { TendersService } from "./tenders.service";
import { PrismaService } from "../prisma/prisma.service";
import { WorkflowService } from "../workflow/workflow.service";
import { EvaluationService } from "../evaluation/evaluation.service";
import { HtmlPdfService } from "../common/pdf/html-pdf.service";

@Module({
  controllers: [TendersController],
  providers: [
    TendersService,
    PrismaService,
    WorkflowService,
    EvaluationService,
    HtmlPdfService,
  ],
})
export class TendersModule {}
