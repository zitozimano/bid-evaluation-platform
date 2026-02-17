import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("tenants")
export class TenantsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async listTenants() {
    const tenants = await this.prisma.tenant.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
    return tenants.map((t) => ({
      id: t.id,
      name: t.name,
      code: t.code,
    }));
  }
}
