import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { ReportsService } from "./reports.service";
import { ReportQueueService } from "./report-queue.service";
import { CouncilZipService } from "./council-zip.service";

import { VerificationService } from "./verification.service";
import { QRCodeService } from "./qrcode.service";
import { SigningService } from "./signing.service";

@Module({
  providers: [
    PrismaService,
    ReportsService,
    ReportQueueService,
    CouncilZipService,
    VerificationService,
    QRCodeService,
    SigningService,
  ],
  exports: [
    ReportsService,
    ReportQueueService,
    CouncilZipService,
    VerificationService,
    QRCodeService,
    SigningService,
  ],
})
export class ReportsModule {}
