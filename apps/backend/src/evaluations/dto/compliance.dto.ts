import { IsBoolean } from "class-validator";

export class ComplianceDto {
  @IsBoolean()
  ok: boolean;
}
