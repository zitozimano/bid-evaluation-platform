import { ApiProperty } from "@nestjs/swagger";

export class BbbeeStatusDto {
  @ApiProperty()
  bidderId: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  validUntil: Date;
}
