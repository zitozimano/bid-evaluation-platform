import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  login(
    @Body()
    body: {
      email: string;
      password: string;
      tenantCode?: string;
    }
  ) {
    return this.auth.login(body.email, body.password, body.tenantCode);
  }
}
