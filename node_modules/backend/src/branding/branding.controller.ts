import { Controller, Get, Query, NotFoundException } from "@nestjs/common";
import { BrandingService } from "./branding.service";

@Controller("branding")
export class BrandingController {
  constructor(private service: BrandingService) {}

  @Get()
  async getBranding(@Query("tenantCode") tenantCode: string) {
    if (!tenantCode) throw new NotFoundException("tenantCode required");

    const tenant = await this.service.getBrandingByTenantCode(tenantCode);
    if (!tenant) throw new NotFoundException("Tenant not found");

    return tenant;
  }
}
