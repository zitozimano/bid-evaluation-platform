import { ApiProperty } from "@nestjs/swagger";

export class BidderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  registrationNumber: string;

  @ApiProperty()
  taxNumber: string;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty()
  tenderId: string;
}
