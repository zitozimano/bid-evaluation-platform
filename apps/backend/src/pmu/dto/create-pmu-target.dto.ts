import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PmuPeriodType {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

export enum PmuTargetMode {
  FIGURE = 'FIGURE',
  PERCENTAGE = 'PERCENTAGE',
}

export class CreatePmuTargetDto {
  @IsString()
  @IsNotEmpty()
  voteId!: string;

  @IsEnum(PmuPeriodType)
  periodType!: PmuPeriodType;

  @IsEnum(PmuTargetMode)
  mode!: PmuTargetMode;

  @IsNumber()
  amount!: number;

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
