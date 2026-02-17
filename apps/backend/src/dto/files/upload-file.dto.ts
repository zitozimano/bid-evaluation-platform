import { ApiProperty } from "@nestjs/swagger";

export class UploadFileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;
}
