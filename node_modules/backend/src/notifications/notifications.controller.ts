import { Controller, Get, Param } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Get(":userId")
  async list(@Param("userId") userId: string) {
    return this.notifications.listForUser(userId);
  }
}
