import { ApiProperty } from "@nestjs/swagger";

export class EvaluationRunHistoryDto {
  @ApiProperty()
  runNumber: number;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  createdAt: Date;
}
