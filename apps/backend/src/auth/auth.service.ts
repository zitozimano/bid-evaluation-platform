import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async validateUser(email: string, password: string, tenantCode?: string) {
    const user = await this.users.findByUsername(email);
    if (!user || !user.active) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (tenantCode) {
      const tenant = await this.prisma.tenant.findUnique({
        where: { code: tenantCode }
      });
      if (!tenant || user.tenantId !== tenant.id) {
        throw new UnauthorizedException("Invalid tenant");
      }
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Invalid credentials");

    return user;
  }

  async login(email: string, password: string, tenantCode?: string) {
    const user = await this.validateUser(email, password, tenantCode);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId
    };

    return {
      access_token: this.jwt.sign(payload)
    };
  }
}
