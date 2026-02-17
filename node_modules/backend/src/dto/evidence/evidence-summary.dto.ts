import { ApiProperty } from "@nestjs/swagger";

export class EvidenceSummaryDto {
  @ApiProperty()
  tenderId: string;

  @ApiProperty()
  latestRun: any;

  @ApiProperty()
  complianceRate: number;

  @ApiProperty()
  ranking: any[];

  @ApiProperty()
  bidders: any[];
}
