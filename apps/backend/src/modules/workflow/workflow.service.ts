import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkflowTimelineResponseDto } from './dto/workflow-response.dto';

@Injectable()
export class WorkflowService {
  constructor(private prisma: PrismaService) {}

  async getWorkflowTimeline(tenderId: string): Promise<WorkflowTimelineResponseDto> {
    // 1. Get evaluation results for this tender
    const results = await this.prisma.evaluationResult.findMany({
      where: { tenderId },
      include: {
        workflowLogs: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!results.length) {
      throw new NotFoundException('No evaluation results found for this tender');
    }

    // 2. Determine current stage (highest stage across all bidders)
    const currentStage = results
      .map(r => r.currentStage)
      .filter(Boolean)
      .sort()
      .pop() ?? null;

    // 3. Merge workflow logs across all bidders
    const logs = results
      .flatMap(r => r.workflowLogs)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map(log => ({
        id: log.id,
        stage: log.stage,
        daysSpent: log.daysSpent,
        createdAt: log.createdAt,
      }));

    return {
      tenderId,
      currentStage,
      logs,
    };
  }
}
