import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  // ⭐ Create a single notification
  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        message: dto.message,
      },
    });
  }

  // ⭐ List notifications for a user
  async listForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  // ⭐ Trigger notifications for all users with a given role
  async triggerForRole(trigger: string, role: string, message: string) {
    const rules = await this.prisma.notificationRule.findMany({
      where: { trigger, role, enabled: true },
    });

    if (rules.length === 0) return;

    const users = await this.prisma.user.findMany({
      where: { role },
    });

    if (users.length === 0) return;

    await this.prisma.notification.createMany({
      data: users.map((u) => ({
        userId: u.id,
        message,
      })),
    });
  }
}
