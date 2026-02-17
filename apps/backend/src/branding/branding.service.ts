import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BrandingService {
  constructor(private prisma: PrismaService) {}

  async getBrandingByTenantCode(code: string) {
    return this.prisma.tenant.findUnique({
      where: { code },
      select: {
        code: true,
        name: true,
        branding: {
          select: {
            primaryColor: true,
            secondaryColor: true,
            logoUrl: true,
            publicName: true,
          },
        },
      },
    });
  }
}
