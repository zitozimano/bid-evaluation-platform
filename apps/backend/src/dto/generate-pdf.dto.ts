import { ApiProperty } from "@nestjs/swagger";

export class GeneratePdfResponseDto {
  @ApiProperty()
  documentId: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  hash: string;
}
