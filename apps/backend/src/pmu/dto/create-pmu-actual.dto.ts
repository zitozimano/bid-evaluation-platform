import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PmuPeriodType } from './create-pmu-target.dto';

export enum CashflowSourceType {
  INVOICE = 'INVOICE',
  PAYMENT_CERTIFICATE = 'PAYMENT_CERTIFICATE',
  MANUAL_ADJUSTMENT = 'MANUAL_ADJUSTMENT',
}

export class CreatePmuActualDto {
  @IsString()
  @IsNotEmpty()
  voteId!: string;

  @IsEnum(PmuPeriodType)
  periodType!: PmuPeriodType;

  @IsEnum(CashflowSourceType)
  sourceType!: CashflowSourceType;

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
