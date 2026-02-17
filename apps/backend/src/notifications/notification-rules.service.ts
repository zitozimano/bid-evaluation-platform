import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.notificationRule.findMany({
      orderBy: { trigger: "asc" },
    });
  }

  async update(
    id: string,
    data: { trigger: string; role: string; enabled: boolean },
  ) {
    return this.prisma.notificationRule.update({
      where: { id },
      data,
    });
  }
}
