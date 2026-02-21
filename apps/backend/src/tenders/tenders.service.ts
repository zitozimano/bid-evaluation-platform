import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateTenderDto } from "./dto/create-tender.dto";
import { UpdateTenderDto } from "./dto/update-tender.dto";
import { WorkflowService } from "../workflow/workflow.service";
import { AuditService } from "../audit/audit.service";

@Injectable()
export class TendersService {
  constructor(
    private readonly workflow: WorkflowService,
    private readonly audit: AuditService
  ) {}

  private tenders = [
    {
      id: "BID-001",
      description: "Road Rehabilitation Phase 1",
      department: "Infrastructure",
      closingDate: "2025-03-15",
      status: "advertised",
      documents: [],
      bidders: []
    }
  ];

  findAll() {
    return this.tenders;
  }

  findOne(id: string) {
    return this.tenders.find((t) => t.id === id);
  }

  create(dto: CreateTenderDto) {
    this.tenders.push(dto as any);

    this.audit.log({
      user: "system",
      entity: "tender",
      entityId: dto.id,
      action: "create",
      payload: dto
    });

    return dto;
  }

  update(id: string, dto: UpdateTenderDto) {
    const tender = this.findOne(id);
    Object.assign(tender, dto);

    this.audit.log({
      user: "system",
      entity: "tender",
      entityId: id,
      action: "update",
      payload: dto
    });

    return tender;
  }

  transition(id: string, to: string) {
    const tender = this.findOne(id);
    const from = tender.status;

    if (!this.workflow.canTransitionTender(from as any, to as any)) {
      throw new BadRequestException(`Invalid transition: ${from} → ${to}`);
    }

    tender.status = to;

    this.audit.log({
      user: "system",
      entity: "tender",
      entityId: id,
      action: "transition",
      oldState: from,
      newState: to
    });

    return tender;
  }
}
