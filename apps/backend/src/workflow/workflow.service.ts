import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkflowLogDto } from "./dto/create-workflow-log.dto";
import { WorkflowTimelineResponseDto } from "./dto/workflow-response.dto";
import { canTransition, WorkflowStage } from "./workflow.state";
import PDFDocument = require("pdfkit");
import * as archiver from "archiver";
import { PassThrough } from "stream";

@Injectable()
export class WorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkflowTimeline(
    tenderId: string,
  ): Promise<WorkflowTimelineResponseDto> {
    const results = await this.prisma.evaluationResult.findMany({
      where: { tenderId },
      include: {
        workflowLogs: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!results.length) {
      throw new NotFoundException("No evaluation results found for this tender");
    }

    const currentStage =
      results
        .map((r) => r.currentStage)
        .filter(Boolean)
        .sort()
        .pop() ?? null;

    const logs = results
      .flatMap((r) => r.workflowLogs)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map((log) => ({
        id: log.id,
        stage: log.stage,
        daysSpent: log.daysSpent,
        createdAt: log.createdAt,
      }));

    return { tenderId, currentStage, logs };
  }

  async createWorkflowLog(resultId: string, dto: CreateWorkflowLogDto) {
    const evaluationResult = await this.prisma.evaluationResult.findUnique({
      where: { id: resultId },
    });

    if (!evaluationResult) {
      throw new NotFoundException("EvaluationResult not found");
    }

    const from = (evaluationResult.currentStage as WorkflowStage | null) ?? null;
    const to = dto.stage as WorkflowStage;

    if (!canTransition(from, to)) {
      throw new BadRequestException(
        `Invalid workflow transition from ${from ?? "null"} to ${to}`,
      );
    }

    const log = await this.prisma.workflowLog.create({
      data: {
        evaluationResultId: resultId,
        stage: dto.stage,
        daysSpent: dto.daysSpent ?? 0,
      },
    });

    await this.prisma.evaluationResult.update({
      where: { id: resultId },
      data: { currentStage: dto.stage },
    });

    return log;
  }

  async exportAuditLog(tenderId: string) {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
      include: {
        evaluationResults: {
          include: {
            workflowLogs: true,
            compliance: true,            // ComplianceItem[]
            exceptions: true,            // EvaluationException[]
            bidder: true,
          },
        },
        evaluationConfig: true,
        signatures: true,               // EvaluationSignature[]
        documents: true,                // EvaluationDocument[]
      },
    });

    if (!tender) {
      throw new NotFoundException("Tender not found");
    }

    return {
      tenderId: tender.id,
      tenderNumber: tender.number,
      createdAt: tender.createdAt,
      evaluationConfig: tender.evaluationConfig,
      signatures: tender.signatures,
      documents: tender.documents,
      results: tender.evaluationResults.map((r) => ({
        id: r.id,
        bidderId: r.bidderId,
        hash: r.hash,
        functionalityScore: r.functionalityScore,
        qualifies: r.qualifies,
        price: r.price,
        priceScore: r.priceScore,
        bbbeeLevel: r.bbbeeLevel,
        bbbeePoints: r.bbbeePoints,
        totalScore: r.totalScore,
        riskScore: r.riskScore,
        complianceRate: r.complianceRate,
        exceptionsCount: r.exceptionsCount,
        slaBreached: r.slaBreached,
        currentStage: r.currentStage,
        workflowLogs: r.workflowLogs,
        compliance: r.compliance,
        exceptions: r.exceptions,
        bidderName: r.bidder.name,
      })),
    };
  }

  async generateCouncilPackPdf(tenderId: string): Promise<Buffer> {
    const audit = await this.exportAuditLog(tenderId);

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    return await new Promise<Buffer>((resolve, reject) => {
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Cover
      doc.fontSize(22).text("Council Pack", { align: "center" }).moveDown();
      doc
        .fontSize(16)
        .text(`Tender: ${audit.tenderNumber}`, { align: "center" })
        .moveDown();
      doc
        .fontSize(12)
        .text(`Generated: ${new Date(audit.createdAt).toLocaleString()}`, {
          align: "center",
        });
      doc.addPage();

      // 1. Overview
      doc.fontSize(16).text("1. Tender Overview", { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Tender ID: ${audit.tenderId}`);
      doc.text(`Tender Number: ${audit.tenderNumber}`);
      doc.moveDown();

      // 2. Evaluation Config
      doc.fontSize(16).text("2. Evaluation Configuration", { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(JSON.stringify(audit.evaluationConfig, null, 2));
      doc.addPage();

      // 3. Bidder Scores
      doc.fontSize(16).text("3. Bidder Scores", { underline: true });
      audit.results.forEach((r, index) => {
        if (index > 0 && index % 4 === 0) doc.addPage();
        doc.moveDown();
        doc.fontSize(13).text(`Bidder: ${r.bidderName} (${r.bidderId})`);
        doc.fontSize(12).text(`Total Score: ${r.totalScore}`);
        doc.text(`Functionality: ${r.functionalityScore}`);
        doc.text(`Price: ${r.priceScore} (Price: ${r.price})`);
        doc.text(`BBBEE Level: ${r.bbbeeLevel ?? "-"} Points: ${r.bbbeePoints}`);
        doc.text(`Qualifies: ${r.qualifies ? "Yes" : "No"}`);
        doc.text(`Risk Score: ${r.riskScore ?? "-"}`);
        doc.text(`Compliance Rate: ${r.complianceRate ?? "-"}%`);
        doc.text(`Exceptions Count: ${r.exceptionsCount}`);
        doc.text(`SLA Breached: ${r.slaBreached ? "Yes" : "No"}`);
        doc.text(`Current Stage: ${r.currentStage ?? "-"}`);
      });
      doc.addPage();

      // 4. Compliance & Exceptions
      doc.fontSize(16).text("4. Compliance & Exceptions", { underline: true });
      audit.results.forEach((r) => {
        doc.moveDown();
        doc.fontSize(13).text(`Bidder: ${r.bidderName} (${r.bidderId})`);
        doc.fontSize(12).text("Compliance Items:");
        r.compliance.forEach((c: any) => {
          doc.text(
            `- Rule ${c.ruleId}: ${c.compliant ? "Compliant" : "Non-compliant"}`,
          );
        });
        doc.moveDown();
        doc.fontSize(12).text("Exceptions:");
        r.exceptions.forEach((e: any) => {
          doc.text(
            `- ${e.type}: ${e.reason} (Approved: ${
              e.approved === null ? "Pending" : e.approved ? "Yes" : "No"
            })`,
          );
        });
      });
      doc.addPage();

      // 5. Signatures
      doc.fontSize(16).text("5. Signatures", { underline: true });
      audit.signatures.forEach((s: any) => {
        doc.moveDown();
        doc.fontSize(12).text(`Role: ${s.role}`);
        doc.text(`Name: ${s.name}`);
        doc.text(`Signed At: ${s.signedAt ?? "Not signed"}`);
        if (s.comment) doc.text(`Comment: ${s.comment}`);
      });

      doc.end();
    });
  }

  async generateEvaluationPackZip(
    tenderId: string,
  ): Promise<NodeJS.ReadableStream> {
    const audit = await this.exportAuditLog(tenderId);

    const stream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => stream.emit("error", err));
    archive.pipe(stream);

    // 1. Raw audit JSON
    archive.append(JSON.stringify(audit, null, 2), { name: "audit.json" });

    // 2. Scores CSV
    const scoresHeader =
      "bidderId,bidderName,functionalityScore,price,priceScore,bbbeeLevel,bbbeePoints,totalScore,qualifies,riskScore,complianceRate,exceptionsCount,slaBreached,currentStage,hash\n";
    const scoresRows = audit.results
      .map(
        (r) =>
          `${r.bidderId},${(r.bidderName || "").replace(/,/g, " ")},${
            r.functionalityScore ?? ""
          },${r.price ?? ""},${r.priceScore ?? ""},${r.bbbeeLevel ?? ""},${
            r.bbbeePoints ?? ""
          },${r.totalScore ?? ""},${r.qualifies ? "true" : "false"},${
            r.riskScore ?? ""
          },${r.complianceRate ?? ""},${r.exceptionsCount},${
            r.slaBreached ? "true" : "false"
          },${r.currentStage ?? ""},${r.hash}`,
      )
      .join("\n");
    archive.append(scoresHeader + scoresRows, { name: "scores.csv" });

    // 3. Compliance CSV
    const complianceHeader = "bidderId,ruleId,compliant\n";
    const complianceRows = audit.results
      .flatMap((r) =>
        r.compliance.map(
          (c: any) => `${r.bidderId},${c.ruleId},${c.compliant ? "true" : "false"}`,
        ),
      )
      .join("\n");
    archive.append(complianceHeader + complianceRows, {
      name: "compliance.csv",
    });

    // 4. Exceptions CSV
    const exceptionsHeader =
      "bidderId,type,reason,approved,approvedBy,approvedAt\n";
    const exceptionsRows = audit.results
      .flatMap((r) =>
        r.exceptions.map(
          (e: any) =>
            `${r.bidderId},${e.type},${(e.reason || "").replace(
              /,/g,
              " ",
            )},${e.approved ?? ""},${e.approvedBy ?? ""},${
              e.approvedAt ?? ""
            }`,
        ),
      )
      .join("\n");
    archive.append(exceptionsHeader + exceptionsRows, {
      name: "exceptions.csv",
    });

    // 5. Council Pack PDF
    const councilPdf = await this.generateCouncilPackPdf(tenderId);
    archive.append(councilPdf, { name: "council-pack.pdf" });

    archive.finalize();
    return stream;
  }
}
