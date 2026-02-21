import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (user) {
      try {
        await this.prisma.analyticsAccessLog.create({
          data: {
            userId: user.userId,
            role: user.role,
            endpoint: req.path,
            ip: req.ip,
            userAgent: req.headers["user-agent"] ?? null,
          },
        });
      } catch (e) {
        console.error("Analytics log failed:", e);
      }
    }

    next();
  }
}
