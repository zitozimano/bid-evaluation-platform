import { Module } from "@nestjs/common";
import { EvaluationsController } from "./evaluations.controller";
import { EvaluationsService } from "./evaluations.service";
import { WorkflowModule } from "../workflow/workflow.module";
import { AuditModule } from "../audit/audit.module";

@Module({
  imports: [WorkflowModule, AuditModule],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  exports: [EvaluationsService]
})
export class EvaluationsModule {}
