import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const ALLOWED = ["AUDIT", "INTERNAL-AUDIT", "ADMIN"];

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
      throw new ForbiddenException("Not authenticated");
    }

    if (!ALLOWED.includes(user.role)) {
      throw new ForbiddenException(
        `Role ${user.role} is not permitted to access admin routes`,
      );
    }

    next();
  }
}
