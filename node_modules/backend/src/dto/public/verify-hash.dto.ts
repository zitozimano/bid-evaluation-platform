import { ApiProperty } from "@nestjs/swagger";

export class VerifyHashResponseDto {
  @ApiProperty()
  valid: boolean;

  @ApiProperty()
  tenderId: string | null;

  @ApiProperty()
  runNumber: number | null;
}
