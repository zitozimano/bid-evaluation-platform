import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { ScmService } from "./scm.service";
import { AssignTenderDto } from "./dto/assign-tender.dto";

@Controller("scm")
export class ScmController {
  constructor(private readonly service: ScmService) {}

  @Roles(Role.ADMIN, Role.SCM)
  @Post("assign")
  assign(@Body() dto: AssignTenderDto, @Req() req: any) {
    return this.service.assign(dto, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get("assignments/:tenderId")
  listAssignments(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.listAssignments(tenderId, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM)
  @Post("unassign/:tenderId/:userId")
  removeAssignment(
    @Param("tenderId") tenderId: string,
    @Param("userId") userId: string,
    @Req() req: any
  ) {
    return this.service.removeAssignment(userId, tenderId, req.user.tenantId);
  }
}
