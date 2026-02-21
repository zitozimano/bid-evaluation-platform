import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRuleDto {
  @ApiProperty()
  @IsString()
  circularId: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsString()
  description: string;
}
