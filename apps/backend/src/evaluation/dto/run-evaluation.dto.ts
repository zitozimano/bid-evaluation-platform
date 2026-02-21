import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RunEvaluationDto {
  @ApiProperty()
  @IsString()
  tenderId: string;
}
