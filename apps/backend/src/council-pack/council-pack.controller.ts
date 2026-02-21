import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { CouncilPackService } from "./council-pack.service";

@Controller("council-pack")
export class CouncilPackController {
  constructor(private readonly service: CouncilPackService) {}

  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Post(":tenderId")
  generate(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.generate(tenderId, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get()
  list(@Req() req: any) {
    return this.service.list(req.user.tenantId);
  }
}
