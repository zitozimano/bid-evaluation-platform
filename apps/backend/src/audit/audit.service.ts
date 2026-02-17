import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAccess(params: {
    userId: string | null;
    role: string | null;
    endpoint: string;
    ip?: string | null;
    userAgent?: string | null;
  }) {
    if (!params.userId || !params.role) return;

    await this.prisma.analyticsAccessLog.create({
      data: {
        userId: params.userId,
        role: params.role,
        endpoint: params.endpoint,
        ip: params.ip ?? null,
        userAgent: params.userAgent ?? null,
      },
    });
  }
}
