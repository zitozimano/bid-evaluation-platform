import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { EvaluationService } from "./evaluation.service";
import { WorkflowLogService } from "./workflow/workflow-log.service";
import { ScoringModule } from "./scoring/scoring.module";
import { EvaluationQueryService } from "./evaluation-query.service";

@Module({
  imports: [
    PrismaModule,
    ScoringModule,
  ],
  providers: [
    EvaluationService,
    WorkflowLogService,
    EvaluationQueryService,
  ],
  exports: [
    EvaluationService,
    EvaluationQueryService,
  ],
})
export class EvaluationModule {}
