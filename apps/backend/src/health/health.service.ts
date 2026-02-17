import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus() {
    return {
      status: "ok",
      version: "1.0.0",
    };
  }

  async getLiveness() {
    return {
      status: "up",
    };
  }

  async getReadiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: "ready",
        db: "connected",
      };
    } catch {
      return {
        status: "not-ready",
        db: "unreachable",
      };
    }
  }
}
