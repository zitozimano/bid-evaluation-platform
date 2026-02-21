import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(input: {
    user: string;
    entity: string;
    entityId: string;
    action: string;
    oldState?: string;
    newState?: string;
    payload?: any;
  }) {
    await this.prisma.auditLog.create({
      data: {
        userId: input.user,
        entity: input.entity,
        entityId: input.entityId,
        action: input.action,
        metadata: input.payload ?? null
      }
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  async findByEntity(entity: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: { entity, entityId },
      orderBy: { createdAt: "desc" }
    });
  }

  async getLogsForEntity(entity: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: { entity, entityId },
      orderBy: { createdAt: "asc" }
    });
  }
}
