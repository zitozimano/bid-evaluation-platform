import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { TenderInsightsService } from "./tender-insights.service";

@Controller("insights/tender")
export class TenderInsightsController {
  constructor(private readonly service: TenderInsightsService) {}

  @Roles(Role.ADMIN, Role.SCM)
  @Post("generate/:tenderId")
  generate(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.generate(tenderId, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get(":tenderId")
  get(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.get(tenderId, req.user.tenantId);
  }
}
