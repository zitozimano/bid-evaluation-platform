import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCircularDto } from "./dto/create-circular.dto";
import { CreateRuleDto } from "./dto/create-rule.dto";
import { RecordComplianceDto } from "./dto/record-compliance.dto";

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  // ⭐ Create Circular
  async createCircular(dto: CreateCircularDto, tenantId: string) {
    return this.prisma.circular.create({
      data: {
        label: dto.label,
        tenantId,
      },
    });
  }

  // ⭐ Create Rule
  async createRule(dto: CreateRuleDto, tenantId: string) {
    const circular = await this.prisma.circular.findFirst({
      where: { id: dto.circularId, tenantId },
    });

    if (!circular) {
      throw new ForbiddenException("Circular not found in tenant.");
    }

    return this.prisma.complianceRule.create({
      data: {
        circularId: dto.circularId,
        code: dto.code,
        label: dto.label,
        description: dto.description,
      },
    });
  }

  // ⭐ Record Compliance Item
  async recordCompliance(dto: RecordComplianceDto, tenantId: string) {
    const evaluation = await this.prisma.evaluationResult.findFirst({
      where: { id: dto.evaluationResultId, tender: { tenantId } },
    });

    if (!evaluation) {
      throw new ForbiddenException("Evaluation result not found in tenant.");
    }

    return this.prisma.complianceItem.create({
      data: {
        evaluationResultId: dto.evaluationResultId,
        ruleId: dto.ruleId,
        compliant: dto.compliant,
      },
    });
  }

  // ⭐ Generate Tender Compliance Dashboard
  async generateDashboard(tenderId: string, tenantId: string) {
    const tender = await this.prisma.tender.findFirst({
      where: { id: tenderId, tenantId },
    });

    if (!tender) {
      throw new ForbiddenException("Tender not found in tenant.");
    }

    const evaluations = await this.prisma.evaluationResult.findMany({
      where: { tenderId },
      include: {
        compliance: true,
        exceptions: true,
        bidder: true,
      },
    });

    const totalItems = evaluations.reduce(
      (sum, e) => sum + e.compliance.length,
      0,
    );

    const compliantItems = evaluations.reduce(
      (sum, e) => sum + e.compliance.filter((c) => c.compliant).length,
      0,
    );

    const complianceRate =
      totalItems === 0 ? null : compliantItems / totalItems;

    const exceptionsCount = evaluations.reduce(
      (sum, e) => sum + e.exceptions.length,
      0,
    );

    const payload = {
      tenderId,
      complianceRate,
      exceptionsCount,
      totalItems,
      compliantItems,
      evaluations,
    };

    await this.prisma.tenderComplianceDashboard.upsert({
      where: { tenderId },
      update: { payload },
      create: { tenderId, payload },
    });

    return payload;
  }

  // ⭐ Get Dashboard
  async getDashboard(tenderId: string, tenantId: string) {
    const dashboard = await this.prisma.tenderComplianceDashboard.findFirst({
      where: {
        tenderId,
        tender: { tenantId },
      },
    });

    if (!dashboard) {
      throw new NotFoundException("Compliance dashboard not found.");
    }

    return dashboard;
  }
}
