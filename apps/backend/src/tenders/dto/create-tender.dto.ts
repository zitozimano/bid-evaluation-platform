import { IsString, IsDateString, IsEnum } from "class-validator";

export class CreateTenderDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  department: string;

  @IsDateString()
  closingDate: string;

  @IsEnum(["pending", "in_progress", "closed"])
  status: string;
}
