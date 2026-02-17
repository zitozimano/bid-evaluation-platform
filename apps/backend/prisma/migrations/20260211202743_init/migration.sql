-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScmTenderAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScmTenderAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "EvaluationResult" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
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

    CONSTRAINT "EvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowLog" (
    "id" TEXT NOT NULL,
    "evaluationResultId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "daysSpent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circular" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
CREATE UNIQUE INDEX "EvaluationConfig_tenderId_key" ON "EvaluationConfig"("tenderId");

-- CreateIndex
CREATE INDEX "BidderCriterionScore_bidderId_idx" ON "BidderCriterionScore"("bidderId");

-- CreateIndex
CREATE INDEX "EvaluationResult_tenderId_idx" ON "EvaluationResult"("tenderId");

-- CreateIndex
CREATE INDEX "EvaluationResult_bidderId_idx" ON "EvaluationResult"("bidderId");

-- CreateIndex
CREATE INDEX "WorkflowLog_evaluationResultId_idx" ON "WorkflowLog"("evaluationResultId");

-- CreateIndex
CREATE INDEX "WorkflowLog_stage_idx" ON "WorkflowLog"("stage");

-- CreateIndex
CREATE INDEX "ComplianceRule_circularId_idx" ON "ComplianceRule"("circularId");

-- CreateIndex
CREATE INDEX "ComplianceItem_evaluationResultId_idx" ON "ComplianceItem"("evaluationResultId");

-- CreateIndex
CREATE INDEX "ComplianceItem_ruleId_idx" ON "ComplianceItem"("ruleId");

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
CREATE INDEX "AnalyticsAccessLog_userId_idx" ON "AnalyticsAccessLog"("userId");

-- CreateIndex
CREATE INDEX "AnalyticsAccessLog_endpoint_idx" ON "AnalyticsAccessLog"("endpoint");

-- AddForeignKey
ALTER TABLE "ScmTenderAssignment" ADD CONSTRAINT "ScmTenderAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScmTenderAssignment" ADD CONSTRAINT "ScmTenderAssignment_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bidder" ADD CONSTRAINT "Bidder_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bbbee" ADD CONSTRAINT "Bbbee_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationConfig" ADD CONSTRAINT "EvaluationConfig_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderCriterionScore" ADD CONSTRAINT "BidderCriterionScore_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationResult" ADD CONSTRAINT "EvaluationResult_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationResult" ADD CONSTRAINT "EvaluationResult_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowLog" ADD CONSTRAINT "WorkflowLog_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceRule" ADD CONSTRAINT "ComplianceRule_circularId_fkey" FOREIGN KEY ("circularId") REFERENCES "Circular"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceItem" ADD CONSTRAINT "ComplianceItem_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceItem" ADD CONSTRAINT "ComplianceItem_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "ComplianceRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationException" ADD CONSTRAINT "EvaluationException_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "EvaluationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationSignature" ADD CONSTRAINT "EvaluationSignature_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationDocument" ADD CONSTRAINT "EvaluationDocument_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsAccessLog" ADD CONSTRAINT "AnalyticsAccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
