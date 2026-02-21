import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as crypto from "crypto";

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  generateHash(buffer: Buffer): string {
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }

  async storeVerification(tenderId: string, type: string, hash: string) {
    const prismaAny = this.prisma as any;
    return prismaAny.reportVerification.create({
      data: { tenderId, type, hash },
    });
  }

  async verifyHash(hash: string) {
    const prismaAny = this.prisma as any;
    return prismaAny.reportVerification.findUnique({
      where: { hash },
      include: { tender: true },
    });
  }
}
