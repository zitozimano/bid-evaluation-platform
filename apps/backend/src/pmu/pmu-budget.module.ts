import { Module } from '@nestjs/common';
import { PmuBudgetController } from './pmu-budget.controller';
import { PmuBudgetService } from './pmu-budget.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PmuBudgetController],
  providers: [PmuBudgetService],
})
export class PmuBudgetModule {}
