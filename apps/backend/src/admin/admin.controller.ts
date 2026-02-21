import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("admin")
export class AdminController {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  //   DEPARTMENTS
  // ─────────────────────────────────────────────

  @Get("departments")
  async listDepartments() {
    const prismaAny = this.prisma as any;
    return prismaAny.department.findMany({
      orderBy: { name: "asc" },
    });
  }

  @Post("departments")
  async createDepartment(@Body() body: { name: string }) {
    const prismaAny = this.prisma as any;
    return prismaAny.department.create({
      data: { name: body.name },
    });
  }

  @Put("departments/:id")
  async updateDepartment(
    @Param("id") id: string,
    @Body() body: { name: string },
  ) {
    const prismaAny = this.prisma as any;
    return prismaAny.department.update({
      where: { id },
      data: { name: body.name },
    });
  }

  // ─────────────────────────────────────────────
  //   CATEGORIES
  // ─────────────────────────────────────────────

  @Get("categories")
  async listCategories() {
    const prismaAny = this.prisma as any;
    return prismaAny.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  @Post("categories")
  async createCategory(@Body() body: { name: string }) {
    const prismaAny = this.prisma as any;
    return prismaAny.category.create({
      data: { name: body.name },
    });
  }

  @Put("categories/:id")
  async updateCategory(
    @Param("id") id: string,
    @Body() body: { name: string },
  ) {
    const prismaAny = this.prisma as any;
    return prismaAny.category.update({
      where: { id },
      data: { name: body.name },
    });
  }

  // ─────────────────────────────────────────────
  //   ASSIGN TO TENDER
  // ─────────────────────────────────────────────

  @Put("tenders/:id/assign")
  async assignTender(
    @Param("id") id: string,
    @Body() body: { departmentId?: string; categoryId?: string },
  ) {
    const prismaAny = this.prisma as any;
    return prismaAny.tender.update({
      where: { id },
      data: {
        departmentId: body.departmentId ?? null,
        categoryId: body.categoryId ?? null,
      },
    });
  }
}
