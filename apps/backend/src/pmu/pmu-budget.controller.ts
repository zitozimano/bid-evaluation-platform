import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PmuBudgetService } from './pmu-budget.service';

@Controller('pmu/budget')
export class PmuBudgetController {
  constructor(private readonly pmuBudgetService!: PmuBudgetService) {}

  @Post('target')
  createTarget(@Body() dto!: any) {
    return this.pmuBudgetService.createTarget(dto);
  }

  @Post('actual')
  createActual(@Body() dto!: any) {
    return this.pmuBudgetService.createActual(dto);
  }

  @Get('vs-actual')
  getBudgetVsActual(@Query() query!: any) {
    return this.pmuBudgetService.getBudgetVsActual(query);
  }
}
