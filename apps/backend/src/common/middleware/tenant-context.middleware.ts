import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // req.user is set by JwtStrategy
    // You can extend or log tenant context here if needed
    // For now, just pass through
    next();
  }
}
