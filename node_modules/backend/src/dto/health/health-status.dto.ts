import { ApiProperty } from "@nestjs/swagger";

export class HealthStatusDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  db: string;

  @ApiProperty()
  version: string;
}
