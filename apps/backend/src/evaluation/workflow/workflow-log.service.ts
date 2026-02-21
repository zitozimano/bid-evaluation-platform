import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class WorkflowLogService {
  constructor(private readonly prisma: PrismaService) {}

  async logStage(
    evaluationResultId: string,
    stage: string,
    daysSpent: number,
  ) {
    return this.prisma.workflowLog.create({
      data: {
        evaluationResultId,
        stage,
        daysSpent,
      },
    });
  }
}
