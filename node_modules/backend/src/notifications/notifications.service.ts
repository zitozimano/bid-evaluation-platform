import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export type NotificationTrigger =
  | "TENDER_STATUS_CHANGED"
  | "TENDER_PUBLISHED"
  | "TENDER_AWARDED";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async sendTenderEmail(to: string, subject: string, body: string) {
    this.logger.log(`Email → ${to}: ${subject}`);
    // wire to real provider in infra
  }

  async createInAppNotification(userId: string, message: string) {
    await this.prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }

  async listForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Notification rules engine
   * Rules stored in DB: notificationRule { id, trigger, role, enabled }
   */
  async handleTrigger(trigger: NotificationTrigger, payload: { tenderId: string; tenderNumber: string; newStatus?: string }) {
    const rules = await this.prisma.notificationRule.findMany({
      where: { trigger, enabled: true },
    });

    for (const rule of rules) {
      // resolve recipients by role
      const users = await this.prisma.user.findMany({
        where: { roles: { has: rule.role } },
      });

      for (const user of users) {
        const message = this.buildMessage(trigger, payload);
        await this.createInAppNotification(user.id, message);
        await this.sendTenderEmail(
          user.email,
          `Tender ${payload.tenderNumber} – ${trigger}`,
          message,
        );
      }
    }
  }

  private buildMessage(
    trigger: NotificationTrigger,
    payload: { tenderId: string; tenderNumber: string; newStatus?: string },
  ) {
    switch (trigger) {
      case "TENDER_STATUS_CHANGED":
        return `Tender ${payload.tenderNumber} status changed to ${payload.newStatus}`;
      case "TENDER_PUBLISHED":
        return `Tender ${payload.tenderNumber} has been published`;
      case "TENDER_AWARDED":
        return `Tender ${payload.tenderNumber} has been awarded`;
      default:
        return `Tender ${payload.tenderNumber} event: ${trigger}`;
    }
  }
}
