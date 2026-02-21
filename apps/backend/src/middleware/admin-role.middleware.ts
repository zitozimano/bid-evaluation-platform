import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const ALLOWED = ["ADMIN", "SCM", "CFO", "AUDIT"];

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const user: any = (req as any).user;

    const role = user?.role || user?.roles?.[0] || null;

    if (!role || !ALLOWED.includes(role)) {
      throw new ForbiddenException(
        `Role ${role ?? "UNKNOWN"} is not permitted to access admin routes`,
      );
    }

    next();
  }
}
