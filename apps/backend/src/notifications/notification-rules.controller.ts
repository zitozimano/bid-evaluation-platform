import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { NotificationRulesService } from "./notification-rules.service";

@Controller("notification-rules")
export class NotificationRulesController {
  constructor(private readonly service: NotificationRulesService) {}

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.service.list();
  }

  @Roles(Role.ADMIN)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() body: { trigger: string; role: string; enabled: boolean }
  ) {
    return this.service.update(id, body);
  }
}
