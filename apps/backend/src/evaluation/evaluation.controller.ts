import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";
import { EvaluationService } from "./evaluation.service";
import { CreateEvaluationConfigDto } from "./dto/create-evaluation-config.dto";
import { UpdateEvaluationConfigDto } from "./dto/update-evaluation-config.dto";

@Controller("evaluation")
export class EvaluationController {
  constructor(private readonly service: EvaluationService) {}

  // CONFIG
  @Roles(Role.ADMIN, Role.SCM)
  @Get("config/:tenderId")
  getConfig(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.getConfig(tenderId, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM)
  @Post("config")
  createConfig(@Body() dto: CreateEvaluationConfigDto, @Req() req: any) {
    return this.service.createConfig(dto, req.user.tenantId);
  }

  @Roles(Role.ADMIN, Role.SCM)
  @Put("config/:tenderId")
  updateConfig(
    @Param("tenderId") tenderId: string,
    @Body() dto: UpdateEvaluationConfigDto,
    @Req() req: any
  ) {
    return this.service.updateConfig(tenderId, dto, req.user.tenantId);
  }

  // RUN EVALUATION
  @Roles(Role.ADMIN, Role.SCM)
  @Post("run/:tenderId")
  runEvaluation(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.runEvaluation(tenderId, req.user.tenantId);
  }

  // LIST RUNS
  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get("runs/:tenderId")
  listRuns(@Param("tenderId") tenderId: string, @Req() req: any) {
    return this.service.listRuns(tenderId, req.user.tenantId);
  }

  // COMPARE RUNS
  @Roles(Role.ADMIN, Role.SCM, Role.CFO, Role.AUDIT)
  @Get("compare/:tenderId/:runA/:runB")
  compareRuns(
    @Param("tenderId") tenderId: string,
    @Param("runA") runA: string,
    @Param("runB") runB: string,
    @Req() req: any
  ) {
    return this.service.compareRuns(
      tenderId,
      Number(runA),
      Number(runB),
      req.user.tenantId
    );
  }
}
