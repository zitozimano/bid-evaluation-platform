import { IsObject } from "class-validator";

export class PriceDto {
  @IsObject()
  prices: Record<string, number>;
}
