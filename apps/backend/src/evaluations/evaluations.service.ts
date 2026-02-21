import { Injectable, BadRequestException } from "@nestjs/common";
import { ComplianceDto } from "./dto/compliance.dto";
import { FunctionalityDto } from "./dto/functionality.dto";
import { PriceDto } from "./dto/price.dto";
import { PreferenceDto } from "./dto/preference.dto";
import { RecommendationDto } from "./dto/recommendation.dto";
import { WorkflowService } from "../workflow/workflow.service";
import { AuditService } from "../audit/audit.service";

@Injectable()
export class EvaluationsService {
  constructor(
    private readonly workflow: WorkflowService,
    private readonly audit: AuditService
  ) {}

  private evaluations = [
    {
      id: "EV-001",
      tenderId: "BID-001",
      bidders: [
        { name: "BuildCorp" },
        { name: "RoadWorks SA" }
      ],
      state: "not_started",
      compliance: null,
      functionality: null,
      price: null,
      preference: null,
      recommendation: null
    }
  ];

  findOne(id: string) {
    return this.evaluations.find((e) => e.id === id);
  }

  transition(id: string, to: string) {
    const evaln = this.findOne(id);
    const from = evaln.state;

    if (!this.workflow.canTransitionEvaluation(from as any, to as any)) {
      throw new BadRequestException(`Invalid transition: ${from} → ${to}`);
    }

    evaln.state = to;

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "transition",
      oldState: from,
      newState: to
    });

    return evaln;
  }

  saveCompliance(id: string, dto: ComplianceDto) {
    const evaln = this.findOne(id);
    evaln.compliance = dto;

    this.transition(id, "compliance");

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "save_compliance",
      payload: dto
    });

    return { success: true };
  }

  saveFunctionality(id: string, dto: FunctionalityDto) {
    const evaln = this.findOne(id);
    evaln.functionality = dto;

    this.transition(id, "functionality");

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "save_functionality",
      payload: dto
    });

    return { success: true };
  }

  savePrice(id: string, dto: PriceDto) {
    const evaln = this.findOne(id);
    evaln.price = dto;

    this.transition(id, "price");

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "save_price",
      payload: dto
    });

    return { success: true };
  }

  savePreference(id: string, dto: PreferenceDto) {
    const evaln = this.findOne(id);
    evaln.preference = dto;

    this.transition(id, "preference");

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "save_preference",
      payload: dto
    });

    return { success: true };
  }

  saveRecommendation(id: string, dto: RecommendationDto) {
    const evaln = this.findOne(id);
    evaln.recommendation = dto;

    this.transition(id, "recommendation");

    this.audit.log({
      user: "system",
      entity: "evaluation",
      entityId: id,
      action: "save_recommendation",
      payload: dto
    });

    return { success: true };
  }
}
