import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AssignTenderDto } from "./dto/assign-tender.dto";

@Injectable()
export class ScmService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: AssignTenderDto, tenantId: string) {
    const { userId, tenderId, role } = dto;

    // Ensure tender belongs to tenant
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender does not belong to your tenant.");
    }

    const effectiveRole = role ?? "SCM";

    return this.prisma.scmTenderAssignment.upsert({
      where: {
        userId_tenderId: { userId, tenderId },
      },
      update: { role: effectiveRole },
      create: { userId, tenderId, role: effectiveRole },
    });
  }

  async listAssignments(tenderId: string, tenantId: string) {
    // Ensure tender belongs to tenant
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender does not belong to your tenant.");
    }

    return this.prisma.scmTenderAssignment.findMany({
      where: { tenderId },
      include: { user: true },
    });
  }

  async removeAssignment(userId: string, tenderId: string, tenantId: string) {
    // Ensure tender belongs to tenant
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender does not belong to your tenant.");
    }

    const existing = await this.prisma.scmTenderAssignment.findUnique({
      where: { userId_tenderId: { userId, tenderId } },
    });

    if (!existing) {
      throw new NotFoundException("Assignment not found.");
    }

    return this.prisma.scmTenderAssignment.delete({
      where: {
        userId_tenderId: { userId, tenderId },
      },
    });
  }
}

