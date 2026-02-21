import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { ThemeBuilder } from "./branding/theme";
import { LogoLoader } from "./branding/logo";

import { VerificationService } from "./verification.service";
import { SigningService } from "./signing.service";

import { buildEvaluationReportPdf } from "./templates/v3/evaluation-report.template";
import { buildTenderSummaryPdf } from "./templates/v3/tender-summary.template";
import { buildCouncilPackPdf } from "./templates/v3/council-pack.template";
import { buildAuditPackPdf } from "./templates/v3/audit-pack.template";

import type PDFKit from "pdfkit";

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private verification: VerificationService,
    private signing: SigningService,
  ) {}

  // LEGACY WRAPPERS (used by queue)
  async buildEvaluationReport(userId: string, tenderId: string) {
    return this.generateEvaluationReport(tenderId);
  }

  async buildTenderSummary(userId: string, tenderId: string) {
    return this.generateTenderSummary(tenderId);
  }

  async buildCouncilPack(userId: string, meetingId: string) {
    return this.generateCouncilPack(meetingId);
  }

  async buildAuditPack(userId: string, periodId: string) {
    return this.generateAuditPack(periodId);
  }

  // INTERNAL: Load tenant branding + theme
  private async loadTheme(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { branding: true },
    });

    const logo = await LogoLoader.load(tenant.branding?.logoUrl);

    return new ThemeBuilder()
      .setColors(
        tenant.branding?.primaryColor,
        tenant.branding?.secondaryColor
      )
      .setLogo(logo)
      .setPublicName(tenant.branding?.publicName)
      .build();
  }

  // EVALUATION REPORT
  async generateEvaluationReport(tenderId: string): Promise<Buffer> {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
    });

    const theme = await this.loadTheme(tender.tenantId);

    const summaryTable = await this.buildSummaryTable(tenderId);
    const rankingsTable = await this.buildRankingsTable(tenderId);

    const pdf = await buildEvaluationReportPdf({
      tenant: {
        name: theme.publicName ?? tender.name,
        primaryColor: theme.colors.primary,
        secondaryColor: theme.colors.secondary,
      },
      tender: {
        number: tender.number,
        description: tender.description ?? "",
      },
      summaryTable,
      rankingsTable,
    });

    const buffer = await this.toBuffer(pdf);

    const hash = this.verification.generateHash(buffer);
    await this.verification.storeVerification(tenderId, "EVALUATION_REPORT", hash);
    await this.signing.signHash(hash, tenderId, "EVALUATION_REPORT");

    return buffer;
  }

  // TENDER SUMMARY
  async generateTenderSummary(tenderId: string): Promise<Buffer> {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
      include: { tenant: { include: { branding: true } } },
    });

    const theme = await this.loadTheme(tender.tenantId);

    const biddersTable = await this.buildBiddersTable(tenderId);

    const pdf = await buildTenderSummaryPdf({
      tenant: {
        name: theme.publicName ?? tender.tenant.name,
        primaryColor: theme.colors.primary,
        secondaryColor: theme.colors.secondary,
      },
      tender: {
        number: tender.number,
        description: tender.description ?? "",
        department: (tender as any).department ?? "",
        budget: (tender as any).budget ?? "",
      },
      biddersTable,
    });

    const buffer = await this.toBuffer(pdf);

    const hash = this.verification.generateHash(buffer);
    await this.verification.storeVerification(tenderId, "TENDER_SUMMARY", hash);
    await this.signing.signHash(hash, tenderId, "TENDER_SUMMARY");

    return buffer;
  }

  // COUNCIL PACK
  async generateCouncilPack(meetingId: string): Promise<Buffer> {
    const prismaAny = this.prisma as any;

    const meeting = await prismaAny.councilMeeting.findUnique({
      where: { id: meetingId },
      include: { agendaItems: true, tenant: { include: { branding: true } } },
    });

    const theme = await this.loadTheme(meeting.tenantId);

    const decisionsTable = await this.buildDecisionsTable(meetingId);

    const pdf = await buildCouncilPackPdf({
      tenant: {
        name: theme.publicName ?? meeting.tenant.name,
        primaryColor: theme.colors.primary,
        secondaryColor: theme.colors.secondary,
      },
      meeting: {
        title: meeting.title,
        date: meeting.date.toISOString().split("T")[0],
      },
      agendaItems: meeting.agendaItems,
      decisionsTable,
    });

    const buffer = await this.toBuffer(pdf);

    const hash = this.verification.generateHash(buffer);
    await this.verification.storeVerification(meeting.tenderId, "COUNCIL_PACK", hash);
    await this.signing.signHash(hash, meeting.tenderId, "COUNCIL_PACK");

    return buffer;
  }

  async generateCouncilPackByTender(tenderId: string): Promise<Buffer> {
    const prismaAny = this.prisma as any;

    const meeting = await prismaAny.councilMeeting.findFirst({
      where: { tenderId },
      include: { agendaItems: true },
    });

    if (!meeting) throw new Error("No council meeting found for tender");

    return this.generateCouncilPack(meeting.id);
  }

  // AUDIT PACK
  async generateAuditPack(periodId: string): Promise<Buffer> {
    const prismaAny = this.prisma as any;

    const period = await prismaAny.auditPeriod.findUnique({
      where: { id: periodId },
      include: { tenant: { include: { branding: true } } },
    });

    const theme = await this.loadTheme(period.tenantId);

    const findingsTable = await this.buildFindingsTable(periodId);
    const actionsTable = await this.buildActionsTable(periodId);

    const pdf = await buildAuditPackPdf({
      tenant: {
        name: theme.publicName ?? period.tenant.name,
        primaryColor: theme.colors.primary,
        secondaryColor: theme.colors.secondary,
      },
      period: { label: period.label },
      findingsTable,
      actionsTable,
    });

    const buffer = await this.toBuffer(pdf);

    const hash = this.verification.generateHash(buffer);
    await this.verification.storeVerification(period.tenderId, "AUDIT_PACK", hash);
    await this.signing.signHash(hash, period.tenderId, "AUDIT_PACK");

    return buffer;
  }

  // INTERNAL HELPERS
  async toBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
    return new Promise(resolve => {
      const chunks: Buffer[] = [];
      doc.on("data", chunk => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  private async buildSummaryTable(tenderId: string): Promise<string[][]> {
    return [
      ["Criteria", "Score"],
      ["Functionality", "85"],
      ["Price", "90"],
      ["BEE", "100"],
    ];
  }

  private async buildRankingsTable(tenderId: string): Promise<string[][]> {
    return [
      ["Rank", "Bidder", "Score"],
      ["1", "ABC Holdings", "92"],
      ["2", "XYZ Group", "88"],
    ];
  }

  private async buildDecisionsTable(meetingId: string): Promise<string[][]> {
    return [
      ["Item", "Decision"],
      ["1", "Approved"],
      ["2", "Deferred"],
    ];
  }

  private async buildFindingsTable(periodId: string): Promise<string[][]> {
    return [
      ["Finding", "Severity"],
      ["Irregular Expenditure", "High"],
      ["Missing Documentation", "Medium"],
    ];
  }

  private async buildActionsTable(periodId: string): Promise<string[][]> {
    return [
      ["Action", "Responsible", "Due Date"],
      ["Fix SCM controls", "CFO", "2026-03-31"],
    ];
  }

  private async buildBiddersTable(tenderId: string): Promise<string[][]> {
    return [
      ["Bidder", "Price", "Score"],
      ["ABC Holdings", "R1,200,000", "92"],
      ["XYZ Group", "R1,350,000", "88"],
    ];
  }
}
