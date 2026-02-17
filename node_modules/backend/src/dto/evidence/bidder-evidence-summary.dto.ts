import { ApiProperty } from "@nestjs/swagger";

export class BidderEvidenceSummaryDto {
  @ApiProperty()
  bidderId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  evidence: any[];

  @ApiProperty()
  evaluation: any;
}
