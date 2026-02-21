import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (user) {
      try {
        await this.prisma.auditLog.create({
          data: {
            tenantId: user.tenantId ?? null,
            userId: user.userId ?? null,
            action: "API_ACCESS",
            entity: "REQUEST",
            entityId: req.path,
            metadata: {
              method: req.method,
              ip: req.ip,
              userAgent: req.headers["user-agent"] ?? null,
            },
          },
        });
      } catch (e) {
        console.error("Audit log failed:", e);
      }
    }

    next();
  }
}
