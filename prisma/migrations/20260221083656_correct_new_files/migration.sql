-- CreateEnum
CREATE TYPE "TenderStage" AS ENUM ('DRAFT', 'EVALUATION', 'AWARDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantBranding" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "logoUrl" TEXT,
    "publicName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantBranding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenantId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "inviteToken" TEXT,
    "resetToken" TEXT,
    "tokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationRule" (
    "id" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" TEXT,

    CONSTRAINT "NotificationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsAccessLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stage" "TenderStage" NOT NULL DEFAULT 'DRAFT',
    "departmentId" TEXT,
    "categoryId" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScmTenderAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScmTenderAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bidder" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "disqualified" BOOLEAN NOT NULL DEFAULT false,
    "disqualificationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bidder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bbbee" (
    "id" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "level" INTEGER,
    "expiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bbbee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" JSONB,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidderCriterionScore" (
    "id" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "criterionCode" TEXT NOT NULL,
    "rawScore" DOUBLE PRECISION NOT NULL,
    "scaleMax" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BidderCriterionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidderIntelligence" (
    "bidderId" TEXT NOT NULL,
    "timeline" JSONB NOT NULL,

    CONSTRAINT "BidderIntelligence_pkey" PRIMARY KEY ("bidderId")
);

-- CreateTable
CREATE TABLE "BidderRiskProfile" (
    "bidderId" TEXT NOT NULL,
    "profile" JSONB NOT NULL,

    CONSTRAINT "BidderRiskProfile_pkey" PRIMARY KEY ("bidderId")
);

-- CreateTable
CREATE TABLE "EvaluationConfig" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "priceWeight" INTEGER NOT NULL,
    "bbbeeWeight" INTEGER NOT NULL,
    "functionalityPass" INTEGER NOT NULL,
    "functionalityMax" INTEGER NOT NULL,
    "criteria" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationRun" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "runNumber" INTEGER NOT NULL,
    "runHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationResult" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "runId" TEXT,
    "functionalityScore" DOUBLE PRECISION NOT NULL,
    "qualifies" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceScore" DOUBLE PRECISION NOT NULL,
    "bbbeeLevel" INTEGER,
    "bbbeePoints" DOUBLE PRECISION NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "riskScore" DOUBLE PRECISION,
    "complianceRate" DOUBLE PRECISION,
    "exceptionsCount" INTEGER NOT NULL DEFAULT 0,
    "slaBreached" BOOLEAN NOT NULL DEFAULT false,
    "currentStage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,

    CONSTRAINT "EvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowLog" (
    "id" TEXT NOT NULL,
    "evaluationResultId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "daysSpent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationException" (
    "id" TEXT NOT NULL,
    "evaluationResultId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "approved" BOOLEAN,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationSignature" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "signature" TEXT,
    "comment" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluationSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationDocument" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "runNumber" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circular" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceRule" (
    "id" TEXT NOT NULL,
    "circularId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceItem" (
    "id" TEXT NOT NULL,
    "evaluationResultId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "compliant" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenderComplianceDashboard" (
    "tenderId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "TenderComplianceDashboard_pkey" PRIMARY KEY ("tenderId")
);

-- CreateTable
CREATE TABLE "TenderInsights" (
    "tenderId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "TenderInsights_pkey" PRIMARY KEY ("tenderId")
);

-- CreateTable
CREATE TABLE "TenderHeatmap" (
    "tenderId" TEXT NOT NULL,
    "cells" JSONB NOT NULL,

    CONSTRAINT "TenderHeatmap_pkey" PRIMARY KEY ("tenderId")
);

-- CreateTable
CREATE TABLE "TenderTimelineEvent" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenderTimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilPack" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouncilPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportAudit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportSignature" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "signature" TEXT,
    "algorithm" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportVerification" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_code_key" ON "Tenant"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TenantBranding_tenantId_key" ON "TenantBranding"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteToken_key" ON "User"("inviteToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE INDEX "User_tenantId_idx" ON "User"("tenantId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "NotificationRule_trigger_idx" ON "NotificationRule"("trigger");

-- CreateIndex
CREATE INDEX "NotificationRule_role_idx" ON "NotificationRule"("role");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRule_trigger_role_key" ON "NotificationRule"("trigger", "role");

-- CreateIndex
CREATE INDEX "AnalyticsAccessLog_userId_idx" ON "AnalyticsAccessLog"("userId");

-- CreateIndex
CREATE INDEX "AnalyticsAccessLog_endpoint_idx" ON "AnalyticsAccessLog"("endpoint");

-- CreateIndex
CREATE INDEX "Tender_tenantId_idx" ON "Tender"("tenantId");

-- CreateIndex
CREATE INDEX "Tender_departmentId_idx" ON "Tender"("departmentId");

-- CreateIndex
CREATE INDEX "Tender_categoryId_idx" ON "Tender"("categoryId");

-- CreateIndex
CREATE INDEX "ScmTenderAssignment_tenderId_idx" ON "ScmTenderAssignment"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "ScmTenderAssignment_userId_tenderId_key" ON "ScmTenderAssignment"("userId", "tenderId");

-- CreateIndex
CREATE INDEX "Bidder_tenderId_idx" ON "Bidder"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "Bbbee_bidderId_key" ON "Bbbee"("bidderId");

-- CreateIndex
CREATE INDEX "Evidence_bidderId_idx" ON "Evidence"("bidderId");

-- CreateIndex
CREATE INDEX "BidderCriterionScore_bidderId_idx" ON "BidderCriterionScore"("bidderId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationConfig_tenderId_key" ON "EvaluationConfig"("tenderId");

-- CreateIndex
CREATE INDEX "EvaluationRun_tenderId_idx" ON "EvaluationRun"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationRun_tenderId_runNumber_key" ON "EvaluationRun"("tenderId", "runNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationResult_hash_key" ON "EvaluationResult"("hash");

-- CreateIndex
CREATE INDEX "EvaluationResult_tenderId_idx" ON "EvaluationResult"("tenderId");

-- CreateIndex
CREATE INDEX "EvaluationResult_bidderId_idx" ON "EvaluationResult"("bidderId");

-- CreateIndex
CREATE INDEX "WorkflowLog_evaluationResultId_idx" ON "WorkflowLog"("evaluationResultId");

-- CreateIndex
CREATE INDEX "WorkflowLog_stage_idx" ON "WorkflowLog"("stage");

-- CreateIndex
CREATE INDEX "EvaluationException_evaluationResultId_idx" ON "EvaluationException"("evaluationResultId");

-- CreateIndex
CREATE INDEX "EvaluationSignature_tenderId_idx" ON "EvaluationSignature"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationSignature_tenderId_role_key" ON "EvaluationSignature"("tenderId", "role");

-- CreateIndex
CREATE INDEX "EvaluationDocument_tenderId_idx" ON "EvaluationDocument"("tenderId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationDocument_tenderId_runNumber_key" ON "EvaluationDocument"("tenderId", "runNumber");

-- CreateIndex
CREATE INDEX "Circular_tenantId_idx" ON "Circular"("tenantId");

-- CreateIndex
CREATE INDEX "ComplianceRule_circularId_idx" ON "ComplianceRule"("circularId");

-- CreateIndex
CREATE INDEX "ComplianceItem_evaluationResultId_idx" ON "ComplianceItem"("evaluationResultId");

-- CreateIndex
CREATE INDEX "ComplianceItem_ruleId_idx" ON "ComplianceItem"("ruleId");

-- CreateIndex
CREATE INDEX "TenderTimelineEvent_tenderId_idx" ON "TenderTimelineEvent"("tenderId");

-- CreateIndex
CREATE INDEX "TenderTimelineEvent_type_idx" ON "TenderTimelineEvent"("type");

-- CreateIndex
CREATE INDEX "ReportAudit_tenderId_idx" ON "ReportAudit"("tenderId");

-- CreateIndex
CREATE INDEX "ReportAudit_userId_idx" ON "ReportAudit"("userId");

-- CreateIndex
CREATE INDEX "ReportAudit_type_idx" ON "ReportAudit"("type");

-- CreateIndex
CREATE INDEX "ReportAudit_createdAt_idx" ON "ReportAudit"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReportSignature_hash_key" ON "ReportSignature"("hash");

-- CreateIndex
CREATE INDEX "ReportSignature_tenderId_idx" ON "ReportSignature"("tenderId");

-- CreateIndex
CREATE INDEX "ReportSignature_type_idx" ON "ReportSignature"("type");

-- CreateIndex
CREATE INDEX "ReportSignature_userId_idx" ON "ReportSignature"("userId");

-- CreateIndex
CREATE INDEX "ReportSignature_createdAt_idx" ON "ReportSignature"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReportVerification_hash_key" ON "ReportVerification"("hash");

-- CreateIndex
CREATE INDEX "ReportVerification_hash_idx" ON "ReportVerification"("hash");

-- CreateIndex
CREATE INDEX "ReportVerification_tenderId_idx" ON "ReportVerification"("tenderId");

-- CreateIndex
CREATE INDEX "ReportVerification_type_idx" ON "ReportVerification"("type");

-- AddForeignKey
ALTER TABLE "TenantBranding" ADD CONSTRAINT "TenantBranding_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRule" ADD CONSTRAINT "NotificationRule_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsAccessLog" ADD CONSTRAINT "AnalyticsAccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScmTenderAssignment" ADD CONSTRAINT "ScmTenderAssignment_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScmTenderAssignment" ADD CONSTRAINT "ScmTenderAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bidder" ADD CONSTRAINT "Bidder_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bbbee" ADD CONSTRAINT "Bbbee_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderCriterionScore" ADD CONSTRAINT "BidderCriterionScore_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderIntelligence" ADD CONSTRAINT "BidderIntelligence_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderRiskProfile" ADD CONSTRAINT "BidderRiskProfile_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationConfig" ADD CONSTRAINT "EvaluationConfig_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationResult" ADD CONSTRAINT "EvaluationResult_runId_fkey" FOREIGN KEY ("runId") REFERENCES "EvaluationRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationResult" ADD CONSTRAINT "EvaluationResult_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationResult" ADD CONSTRAINT "EvaluationResult_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowLog" ADD CONSTRAINT "WorkflowLog_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationException" ADD CONSTRAINT "EvaluationException_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationSignature" ADD CONSTRAINT "EvaluationSignature_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationDocument" ADD CONSTRAINT "EvaluationDocument_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circular" ADD CONSTRAINT "Circular_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceRule" ADD CONSTRAINT "ComplianceRule_circularId_fkey" FOREIGN KEY ("circularId") REFERENCES "Circular"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceItem" ADD CONSTRAINT "ComplianceItem_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceItem" ADD CONSTRAINT "ComplianceItem_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "ComplianceRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderComplianceDashboard" ADD CONSTRAINT "TenderComplianceDashboard_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderInsights" ADD CONSTRAINT "TenderInsights_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderHeatmap" ADD CONSTRAINT "TenderHeatmap_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderTimelineEvent" ADD CONSTRAINT "TenderTimelineEvent_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouncilPack" ADD CONSTRAINT "CouncilPack_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportVerification" ADD CONSTRAINT "ReportVerification_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
