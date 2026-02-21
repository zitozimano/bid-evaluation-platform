import { IsString, IsNumber } from "class-validator";

export class RecommendationDto {
  @IsString()
  name: string;

  @IsNumber()
  total: number;
}
