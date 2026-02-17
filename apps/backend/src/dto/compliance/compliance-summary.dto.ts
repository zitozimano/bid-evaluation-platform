import { ApiProperty } from "@nestjs/swagger";

export class ComplianceSummaryDto {
  @ApiProperty()
  tenderId: string;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  compliantItems: number;

  @ApiProperty()
  nonCompliantItems: number;

  @ApiProperty()
  complianceRate: number;
}
