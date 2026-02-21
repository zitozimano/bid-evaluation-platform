import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateTenantBrandingDto } from "./dto/update-tenant-branding.dto";

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: { branding: true },
    });
  }

  async updateBranding(tenantId: string, data: UpdateTenantBrandingDto) {
    return this.prisma.tenantBranding.upsert({
      where: { tenantId },
      update: {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        logoUrl: data.logoUrl,
        publicName: data.publicName,
      },
      create: {
        tenantId,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        logoUrl: data.logoUrl,
        publicName: data.publicName,
      },
    });
  }
}
