import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class AssignTenderDto {
  @ApiProperty()
  @IsString()
  tenderId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: "Role for assignment: SCM, SCM_OWNER, or EVALUATOR",
  })
  @IsOptional()
  @IsString()
  role?: string;
}
