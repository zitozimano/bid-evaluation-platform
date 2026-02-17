import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { NotificationRulesService } from "./notification-rules.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("notification-rules")
@UseGuards(RolesGuard)
export class NotificationRulesController {
  constructor(
    private readonly rulesService: NotificationRulesService,
  ) {}

  @Get()
  @Roles("ADMIN")
  async list() {
    return this.rulesService.list();
  }

  @Put(":id")
  @Roles("ADMIN")
  async update(
    @Param("id") id: string,
    @Body()
    body: { trigger: string; role: string; enabled: boolean },
  ) {
    return this.rulesService.update(id, body);
  }
}
