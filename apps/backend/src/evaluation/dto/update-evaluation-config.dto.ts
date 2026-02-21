import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional } from "class-validator";

export class UpdateEvaluationConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  priceWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  bbbeeWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  functionalityPass?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  functionalityMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  criteria?: any;
}
