import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateEvaluationConfigDto {
  @ApiProperty()
  @IsString()
  tenderId: string;

  @ApiProperty()
  @IsNumber()
  priceWeight: number;

  @ApiProperty()
  @IsNumber()
  bbbeeWeight: number;

  @ApiProperty()
  @IsNumber()
  functionalityPass: number;

  @ApiProperty()
  @IsNumber()
  functionalityMax: number;

  @ApiProperty({ description: "JSON criteria definition" })
  @IsObject()
  criteria: any;
}
