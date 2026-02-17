import { ApiProperty } from "@nestjs/swagger";

export class BidderPerformanceDto {
  @ApiProperty()
  rank: number;

  @ApiProperty()
  bidder: string;

  @ApiProperty()
  totalScore: number;

  @ApiProperty()
  functionalityScore: number;

  @ApiProperty()
  priceScore: number;

  @ApiProperty()
  bbbeePoints: number;

  @ApiProperty()
  riskScore: number;

  @ApiProperty()
  complianceRate: number;

  @ApiProperty()
  exceptionsCount: number;

  @ApiProperty()
  slaBreached: boolean;

  @ApiProperty()
  currentStage: string;
}
