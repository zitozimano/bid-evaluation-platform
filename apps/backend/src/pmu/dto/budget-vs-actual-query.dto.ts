import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PmuPeriodType } from './create-pmu-target.dto';

export class BudgetVsActualQueryDto {
  @IsEnum(PmuPeriodType)
  periodType!: PmuPeriodType;

  @IsOptional()
  @IsString()
  voteId?!: string;

  @IsOptional()
  @IsString()
  projectId?!: string;

  @IsOptional()
  @IsString()
  tenderId?!: string;

  @IsOptional()
  @IsString()
  costCenterId?!: string;

  @IsOptional()
  @IsString()
  periodStart?!: string;

  @IsOptional()
  @IsString()
  periodEnd?!: string;
}
