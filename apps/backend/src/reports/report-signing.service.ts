import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { createHash } from "crypto";
import { ReportType } from "./report-audit.service";

@Injectable()
export class ReportSigningService {
  constructor(private readonly prisma: PrismaService) {}

  computeHash(buffer: Buffer): string {
    return createHash("sha256").update(buffer).digest("hex");
  }

  async registerSignature(hash: string, tenderId: string, type: ReportType, userId: string) {
    // idempotent: if hash already exists, do nothing
    const existing = await this.prisma.reportSignature.findUnique({
      where: { hash },
    });

    if (existing) return existing;

    return this.prisma.reportSignature.create({
      data: {
        hash,
        tenderId,
        type,
        userId,
      },
    });
  }

  async verify(hash: string) {
    const sig = await this.prisma.reportSignature.findUnique({
      where: { hash },
    });

    if (!sig) {
      throw new NotFoundException("Report signature not found.");
    }

    return sig;
  }
}
