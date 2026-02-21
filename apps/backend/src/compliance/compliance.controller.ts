import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { ComplianceService } from "./compliance.service";
import { CreateCircularDto } from "./dto/create-circular.dto";
import { CreateRuleDto } from "./dto/create-rule.dto";
import { RecordComplianceDto } from "./dto/record-compliance.dto";

@Controller("compliance")
export class ComplianceController {
  constructor(private readonly service: ComplianceService) {}

  // ───────────────────────────────────────────────
  // CREATE CIRCULAR
  // ───────────────────────────────────────────────
  @Roles(Role.ADMIN, Role.SCM)
  @Post("circulars")
  createCircular(@Body() dto: CreateCircularDto, @Req() req: any) {
    return this.service.createCircular(dto, req.user.tenantId);
  }

  // ───────────────────────────────────────────────
  // CREATE RULE
  // ───────────────────────────────────────────────
  @Roles(Role.ADMIN, Role.SCM)
  @Post("rules")
  createRule(@Body() dto: CreateRuleDto, @Req() req: any) {
    return this.service.createRule(dto, req.user.tenantId);
  }

  // ───────────────────────────────────────────────
  // RECORD COMPLIANCE ITEM
  // ───────────────────────────────────────────────
  @Roles(Role.ADMIN, Role.SCM, Role.EVALUATOR)
  @Post("record")
  recordCompliance(@Body() dto: RecordComplianceDto, @Req() req: any) {
    return this.service.recordCompliance(dto, req.user.tenantId);
  }

  // ───────────────────────────────────────────────
  // GENERATE DASHBOARD
  // ───────────────────────────────────────────────
  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Post("dashboard/:tenderId")
  generateDashboard(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.generateDashboard(tenderId, req.user.tenantId);
  }

  // ───────────────────────────────────────────────
  // GET DASHBOARD
  // ───────────────────────────────────────────────
  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get("dashboard/:tenderId")
  getDashboard(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.getDashboard(tenderId, req.user.tenantId);
  }
}
