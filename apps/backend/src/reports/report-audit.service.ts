import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export type ReportType =
  | "EVALUATION"
  | "COUNCIL_PACK"
  | "AUDIT_PACK"
  | "TENDER_SUMMARY"
  | "COUNCIL_ZIP";

@Injectable()
export class ReportAuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(userId: string, tenderId: string, type: ReportType) {
    await this.prisma.reportAudit.create({
      data: {
        userId,
        tenderId,
        type,
      },
    });
  }

  async listForTender(tenderId: string) {
    return this.prisma.reportAudit.findMany({
      where: { tenderId },
      orderBy: { createdAt: "desc" },
    });
  }

  async listForUser(userId: string) {
    return this.prisma.reportAudit.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async listAll(limit = 200) {
    return this.prisma.reportAudit.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
