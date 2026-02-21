import { IsObject } from "class-validator";

export class PreferenceDto {
  @IsObject()
  levels: Record<string, string>;
}
