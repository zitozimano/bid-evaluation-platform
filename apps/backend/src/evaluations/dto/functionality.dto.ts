import { IsObject } from "class-validator";

export class FunctionalityDto {
  @IsObject()
  scores: Record<string, Record<string, number>>;
}
