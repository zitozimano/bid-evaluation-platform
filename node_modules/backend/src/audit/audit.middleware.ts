import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuditService } from "./audit.service";

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private auditService: AuditService) {}

  use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    res.on("finish", () => {
      const user = req.user;
      const endpoint = req.originalUrl || req.url;
      const ip =
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        null;
      const userAgent = (req.headers["user-agent"] as string) || null;

      this.auditService.logAccess({
        userId: user?.id ?? null,
        role: user?.role ?? null,
        endpoint,
        ip,
        userAgent,
      });
    });

    next();
  }
}
