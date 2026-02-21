import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GenerateCouncilPackDto {
  @ApiProperty()
  @IsString()
  tenderId: string;
}
