import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { EvaluationsService } from "./evaluations.service";
import { ComplianceDto } from "./dto/compliance.dto";
import { FunctionalityDto } from "./dto/functionality.dto";
import { PriceDto } from "./dto/price.dto";
import { PreferenceDto } from "./dto/preference.dto";
import { RecommendationDto } from "./dto/recommendation.dto";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";

@Controller("evaluations")
export class EvaluationsController {
  constructor(private readonly service: EvaluationsService) {}

  @Roles(Role.PMU, Role.SCM, Role.EVALUATOR, Role.ADMIN, Role.IA, Role.CFO)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Roles(Role.SCM, Role.PMU, Role.ADMIN)
  @Post(":id/compliance")
  saveCompliance(@Param("id") id: string, @Body() dto: ComplianceDto) {
    return this.service.saveCompliance(id, dto);
  }

  @Roles(Role.EVALUATOR, Role.PMU, Role.ADMIN)
  @Post(":id/functionality")
  saveFunctionality(@Param("id") id: string, @Body() dto: FunctionalityDto) {
    return this.service.saveFunctionality(id, dto);
  }

  @Roles(Role.EVALUATOR, Role.PMU, Role.ADMIN)
  @Post(":id/price")
  savePrice(@Param("id") id: string, @Body() dto: PriceDto) {
    return this.service.savePrice(id, dto);
  }

  @Roles(Role.EVALUATOR, Role.PMU, Role.ADMIN)
  @Post(":id/preference")
  savePreference(@Param("id") id: string, @Body() dto: PreferenceDto) {
    return this.service.savePreference(id, dto);
  }

  @Roles(Role.CFO, Role.PMU, Role.ADMIN)
  @Post(":id/recommendation")
  saveRecommendation(@Param("id") id: string, @Body() dto: RecommendationDto) {
    return this.service.saveRecommendation(id, dto);
  }
}
