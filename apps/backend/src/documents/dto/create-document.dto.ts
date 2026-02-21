import { IsString } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  tenderId: string;

  @IsString()
  type: string; // e.g. "TOR", "SPEC", "BIDDER_DOC"
}
