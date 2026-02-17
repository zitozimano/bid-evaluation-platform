import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateWorkflowLogDto {
  @IsString()
  stage: string;

  @IsOptional()
  @IsNumber()
  daysSpent?: number;
}
