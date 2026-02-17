import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("admin")
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  @Roles("ADMIN")
  async listUsers() {
    return this.adminService.listUsers();
  }

  @Put("users/:userId/roles")
  @Roles("ADMIN")
  async updateUserRoles(
    @Param("userId") userId: string,
    @Body() body: { roles: string[] },
  ) {
    return this.adminService.updateUserRoles(userId, body.roles ?? []);
  }

  @Get("notification-rules")
  @Roles("ADMIN")
  async listNotificationRules() {
    return this.adminService.listNotificationRules();
  }

  @Put("notification-rules/:id")
  @Roles("ADMIN")
  async updateNotificationRule(
    @Param("id") id: string,
    @Body()
    body: { trigger: string; role: string; enabled: boolean },
  ) {
    return this.adminService.updateNotificationRule(id, body);
  }
}
