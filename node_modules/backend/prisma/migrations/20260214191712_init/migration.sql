-- AlterTable
ALTER TABLE "WorkflowLog" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

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
CREATE TABLE "TenderTimelineEvent" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenderTimelineEvent_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "TenderComplianceDashboard" (
    "tenderId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "TenderComplianceDashboard_pkey" PRIMARY KEY ("tenderId")
);

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "NotificationRule_trigger_idx" ON "NotificationRule"("trigger");

-- CreateIndex
CREATE INDEX "NotificationRule_role_idx" ON "NotificationRule"("role");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationRule_trigger_role_key" ON "NotificationRule"("trigger", "role");

-- CreateIndex
CREATE INDEX "TenderTimelineEvent_tenderId_idx" ON "TenderTimelineEvent"("tenderId");

-- CreateIndex
CREATE INDEX "TenderTimelineEvent_type_idx" ON "TenderTimelineEvent"("type");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationRule" ADD CONSTRAINT "NotificationRule_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderTimelineEvent" ADD CONSTRAINT "TenderTimelineEvent_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderInsights" ADD CONSTRAINT "TenderInsights_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderHeatmap" ADD CONSTRAINT "TenderHeatmap_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderIntelligence" ADD CONSTRAINT "BidderIntelligence_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidderRiskProfile" ADD CONSTRAINT "BidderRiskProfile_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderComplianceDashboard" ADD CONSTRAINT "TenderComplianceDashboard_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
