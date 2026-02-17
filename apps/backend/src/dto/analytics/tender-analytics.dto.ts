import { ApiProperty } from "@nestjs/swagger";

export class TenderAnalyticsDto {
  @ApiProperty()
  complianceRate: number;

  @ApiProperty()
  riskScore: number;

  @ApiProperty()
  exceptionStats: any;

  @ApiProperty()
  slaStats: any;

  @ApiProperty()
  stageDistribution: any[];
}
