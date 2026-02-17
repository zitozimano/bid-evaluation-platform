import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async updateUserRoles(userId: string, roles: string[]) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { roles },
    });
  }

  async listNotificationRules() {
    return this.prisma.notificationRule.findMany({
      orderBy: { trigger: "asc" },
    });
  }

  async updateNotificationRule(
    id: string,
    data: { trigger: string; role: string; enabled: boolean },
  ) {
    return this.prisma.notificationRule.update({
      where: { id },
      data,
    });
  }
}
