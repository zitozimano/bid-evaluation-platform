import { ApiProperty } from "@nestjs/swagger";

export class EvaluationResultDto {
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
  qualifies: boolean;

  @ApiProperty()
  rank: number;
}
