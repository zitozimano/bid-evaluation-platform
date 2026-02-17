import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request & { tenant?: any }, res: Response, next: NextFunction) {
    const code = (req.headers["x-tenant-code"] as string) || null;

    if (!code) {
      req.tenant = null;
      return next();
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { code },
      include: { branding: true },
    });

    if (!tenant || !tenant.active) {
      throw new NotFoundException("Tenant not found or inactive");
    }

    req.tenant = tenant;
    next();
  }
}
