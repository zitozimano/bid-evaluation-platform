import { Controller, Get, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT, Role.EVALUATOR)
  @Get()
  listForUser(@Req() req: any) {
    return this.service.listForUser(req.user.id);
  }
}
