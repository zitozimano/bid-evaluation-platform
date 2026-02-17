import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateBidderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  registrationNumber: string;

  @ApiProperty()
  @IsString()
  taxNumber: string;

  @ApiProperty()
  @IsEmail()
  contactEmail: string;

  @ApiProperty()
  @IsString()
  tenderId: string;
}
