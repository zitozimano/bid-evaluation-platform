import { Controller, Get, Param } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { AuditService } from "./audit.service";

@Controller("audit")
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Roles(Role.ADMIN, Role.AUDIT)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles(Role.ADMIN, Role.AUDIT)
  @Get(":entity/:id")
  findByEntity(@Param("entity") entity: string, @Param("id") id: string) {
    return this.service.findByEntity(entity, id);
  }
}
