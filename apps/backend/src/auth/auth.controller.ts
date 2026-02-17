import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class AuthController {
  @Get("me")
  async me(@Req() req: Request) {
    return req.user;
  }
}
