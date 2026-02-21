import { Controller, Get, Param } from "@nestjs/common";
import { ReportSigningService } from "./report-signing.service";

@Controller("public/reports")
export class PublicReportsController {
  constructor(private readonly signing: ReportSigningService) {}

  @Get("verify/:hash")
  async verify(@Param("hash") hash: string) {
    const sig = await this.signing.verify(hash);

    return {
      valid: true,
      hash: sig.hash,
      tenderId: sig.tenderId,
      type: sig.type,
      userId: sig.userId,
      createdAt: sig.createdAt,
    };
  }
}
