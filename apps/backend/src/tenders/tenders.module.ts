import { Module } from "@nestjs/common";
import { TendersService } from "./tenders.service";
import { TendersController } from "./tenders.controller";
import { PrismaService } from "../prisma/prisma.service";
import { WorkflowModule } from "../workflow/workflow.module";   // ⭐ REQUIRED
import { AuditModule } from "../audit/audit.module";             // ⭐ REQUIRED because TendersService injects AuditService

@Module({
  imports: [
    WorkflowModule,   // ⭐ Provides WorkflowService
    AuditModule       // ⭐ Provides AuditService
  ],
  providers: [
    TendersService,
    PrismaService
  ],
  controllers: [TendersController],
  exports: [TendersService]
})
export class TendersModule {}
