import { Controller, Get, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Tenant } from "../tenant/tenant.decorator";

@Controller("analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get("summary")
  summary(@Tenant() tenant: any) {
    return this.service.summary(tenant?.id ?? null);
  }

  @Get("tenders")
  tenders(@Tenant() tenant: any) {
    return this.service.tenders(tenant?.id ?? null);
  }
}
