import { Module } from '@nestjs/common';
import { PmuBudgetService } from './pmu-budget.service';
import { PmuBudgetController } from './pmu-budget.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PmuBudgetController],
  providers: [
    PmuBudgetService,
    PrismaClient,
  ],
  exports: [PmuBudgetService],
})
export class PmuModule {}
