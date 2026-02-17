import { ApiProperty } from "@nestjs/swagger";

export class ComplianceItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  compliant: boolean;

  @ApiProperty()
  evaluationResultId: string;
}
