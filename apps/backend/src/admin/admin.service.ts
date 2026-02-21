import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async updateUserRole(userId: string, role: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async listNotificationRules() {
    return this.prisma.notificationRule.findMany({
      orderBy: { id: "desc" },
    });
  }

  async updateNotificationRule(
    id: string,
    body: Partial<{
      enabled: boolean;
      role: string;
      trigger: string;
    }>,
  ) {
    return this.prisma.notificationRule.update({
      where: { id },
      data: {
        enabled: body.enabled ?? undefined,
        role: body.role ?? undefined,
        trigger: body.trigger ?? undefined,
      },
    });
  }
}
