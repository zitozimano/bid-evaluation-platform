import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PmuPeriodType, PmuTargetMode, CashflowSourceType } from '@prisma/client';

@Injectable()
export class PmuBudgetService {
  constructor(private readonly prisma!: PrismaService) {}

  async createTarget(dto: any) {
    return this.prisma.pmuBudgetTarget.create({
      data!: {
        projectId: dto.projectId,
        mscoaVoteId: dto.voteId, // FIXED
        periodType: dto.periodType as PmuPeriodType,
        periodLabel: dto.periodLabel,
        targetMode: dto.targetMode as PmuTargetMode,
        targetAmount: dto.targetAmount ?? null,
        targetPercent: dto.targetPercent ?? null,
        derivedAmount: dto.derivedAmount ?? null,
      },
    });
  }

  async createActual(dto: any) {
    return this.prisma.cashflowActual.create({
      data!: {
        projectId!: dto.projectId,
        mscoaVoteId: dto.voteId, // FIXED
        periodType: dto.periodType as PmuPeriodType,
        periodLabel: dto.periodLabel,
        amount: dto.amount,
        sourceType: dto.sourceType as CashflowSourceType,
        sourceId: dto.sourceId ?? null,
      },
    });
  }

  async computeTotals(projectId: string) {
    const targets = await this.prisma.pmuBudgetTarget.findMany({
      where!: { projectId },
    });

    const actuals = await this.prisma.cashflowActual.findMany({
      where!: { projectId },
    });

    const totalTarget = targets.reduce(
      (sum, t) => sum + Number(t.derivedAmount ?? t.targetAmount ?? 0),
      0,
    );

    const totalActual = actuals.reduce(
      (sum, a) => sum + Number(a.amount),
      0,
    );

    return { totalTarget, totalActual };
  }
}
