import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class RecordComplianceDto {
  @ApiProperty()
  @IsString()
  evaluationResultId: string;

  @ApiProperty()
  @IsString()
  ruleId: string;

  @ApiProperty()
  @IsBoolean()
  compliant: boolean;
}
