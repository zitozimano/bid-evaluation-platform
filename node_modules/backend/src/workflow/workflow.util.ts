import { PrismaService } from "../prisma/prisma.service";

export type WorkflowStage =
  | "FUNCTIONALITY"
  | "PRICE"
  | "BBBEE"
  | "CONSOLIDATION"
  | "APPROVAL"
  | "ARCHIVED";

export async function advanceWorkflowStage(
  prisma: PrismaService,
  evaluationResultId: string,
  nextStage: WorkflowStage,
  daysSpent: number
) {
  await prisma.workflowLog.create({
    data: {
      evaluationResultId,
      stage: nextStage,
      daysSpent,
    },
  });

  await prisma.evaluationResult.update({
    where: { id: evaluationResultId },
    data: { currentStage: nextStage },
  });
}
