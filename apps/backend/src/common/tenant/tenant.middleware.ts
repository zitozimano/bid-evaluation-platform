import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const mode = process.env.HYDROFLOW_MODE ?? "multi-tenant";
    const defaultTenantId = process.env.DEFAULT_TENANT_ID ?? null;

    if (mode === "single-tenant") {
      (req as any).tenantId = defaultTenantId;
      return next();
    }

    const queryTenant = req.query["tenantId"];
    const headerTenant = req.headers["x-tenant-id"];

    const tenantId =
      (Array.isArray(queryTenant) ? queryTenant[0] : queryTenant) ??
      (Array.isArray(headerTenant) ? headerTenant[0] : headerTenant) ??
      null;

    (req as any).tenantId = tenantId;
    next();
  }
}
