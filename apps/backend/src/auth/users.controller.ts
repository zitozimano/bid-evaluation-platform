import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "./roles.decorator";
import { Role } from "./roles.enum";

@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body()
    body: {
      email: string;
      password: string;
      role: Role;
      tenantId?: string;
    }
  ) {
    return this.users.create(body.email, body.password, body.role, body.tenantId);
  }

  @Roles(Role.ADMIN)
  @Patch(":id/role")
  updateRole(@Param("id") id: string, @Body() body: { role: Role }) {
    return this.users.updateRole(id, body.role);
  }

  @Roles(Role.ADMIN)
  @Patch(":id/disable")
  disable(@Param("id") id: string) {
    return this.users.disable(id);
  }

  @Roles(Role.ADMIN)
  @Patch(":id/enable")
  enable(@Param("id") id: string) {
    return this.users.enable(id);
  }

  // -------- INVITE USER --------

  @Roles(Role.ADMIN)
  @Post("invite")
  invite(
    @Body()
    body: {
      email: string;
      role: Role;
      tenantId?: string;
    }
  ) {
    return this.users.inviteUser(body.email, body.role, body.tenantId);
  }

  @Post("invite/accept")
  acceptInvite(@Body() body: { token: string; password: string }) {
    return this.users.acceptInvite(body.token, body.password);
  }

  // -------- PASSWORD RESET --------

  @Post("password/reset/request")
  requestReset(@Body() body: { email: string }) {
    return this.users.requestPasswordReset(body.email);
  }

  @Post("password/reset/confirm")
  resetPassword(@Body() body: { token: string; password: string }) {
    return this.users.resetPassword(body.token, body.password);
  }
}
