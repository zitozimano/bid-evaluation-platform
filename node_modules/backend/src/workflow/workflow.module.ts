import { Module } from "@nestjs/common";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService } from "./workflow.service";
import { PrismaService } from "../prisma/prisma.service";
import { WorkflowRoleGuard } from "./guards/workflow-role.guard";
import { WorkflowDownloadGuard } from "./guards/workflow-download.guard";

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, PrismaService, WorkflowRoleGuard, WorkflowDownloadGuard],
})
export class WorkflowModule {}
