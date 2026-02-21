import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { UpdateTenantBrandingDto } from "./dto/update-tenant-branding.dto";

@Controller("tenants")
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get(":id")
  async getTenant(@Param("id") id: string) {
    return this.tenantService.findOne(id);
  }

  @Get(":id/branding")
  async getBranding(@Param("id") id: string) {
    const tenant = await this.tenantService.findOne(id);
    return tenant.branding ?? {
      primaryColor: null,
      secondaryColor: null,
      logoUrl: null,
      publicName: null,
    };
  }

  @Put(":id/branding")
  async updateBranding(
    @Param("id") id: string,
    @Body() dto: UpdateTenantBrandingDto,
  ) {
    return this.tenantService.updateBranding(id, dto);
  }
}
