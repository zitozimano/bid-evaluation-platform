//
// Analytics Response Contracts
// Bid Evaluation Platform — Shared Models
//

/**
 * Standard envelope for all analytics responses.
 */
export interface AnalyticsResponseEnvelope<T> {
  success: boolean;
  generatedAt: string; // ISO timestamp
  data: T;
}

//
// ─────────────────────────────────────────────────────────────
//  OVERVIEW ANALYTICS
// ─────────────────────────────────────────────────────────────
//

export interface AnalyticsOverviewStage {
  id: string;
  label: string;
  avgDays: number;
}

export interface AnalyticsOverviewMonth {
  month: string; // "2026-01"
  count: number;
}

export interface AnalyticsOverviewData {
  totalEvaluations: number;
  avgTurnaroundDays: number;
  complianceRate: number; // %
  exceptionsCount: number;
  evaluationsPerMonth: AnalyticsOverviewMonth[];
  workflowStages: AnalyticsOverviewStage[];
}

export type AnalyticsOverviewResponse =
  AnalyticsResponseEnvelope<AnalyticsOverviewData>;

//
// ─────────────────────────────────────────────────────────────
//  BIDDER ANALYTICS
// ─────────────────────────────────────────────────────────────
//

export interface AnalyticsBidderStatsItem {
  bidderId: string;
  name: string;
  totalParticipated: number;
  totalAwarded: number;
  avgScore: number;
  avgRisk: number;
  exceptionsCount: number;
  complianceRate: number; // %
}

export interface AnalyticsBidderStatsData {
  bidders: AnalyticsBidderStatsItem[];
}

export type AnalyticsBidderStatsResponse =
  AnalyticsResponseEnvelope<AnalyticsBidderStatsData>;

//
// ─────────────────────────────────────────────────────────────
//  PROCESS ANALYTICS
// ─────────────────────────────────────────────────────────────
//

export interface AnalyticsProcessStageDuration {
  stageId: string;
  label: string;
  avgDays: number;
}

export interface AnalyticsProcessStuckItem {
  stageId: string;
  count: number;
}

export interface AnalyticsProcessStatsData {
  avgDaysPerStage: AnalyticsProcessStageDuration[];
  stuckEvaluations: AnalyticsProcessStuckItem[];
  slaBreaches: number;
}

export type AnalyticsProcessStatsResponse =
  AnalyticsResponseEnvelope<AnalyticsProcessStatsData>;

//
// ─────────────────────────────────────────────────────────────
//  COMPLIANCE ANALYTICS
// ─────────────────────────────────────────────────────────────
//

export interface AnalyticsComplianceRuleBreach {
  ruleId: string;
  label: string;
  breachCount: number;
}

export interface AnalyticsComplianceCircular {
  circularId: string;
  label: string;
  complianceRate: number;
}

export interface AnalyticsComplianceStatsData {
  overallComplianceRate: number;
  mostBreachedRules: AnalyticsComplianceRuleBreach[];
  complianceByCircular: AnalyticsComplianceCircular[];
}

export type AnalyticsComplianceStatsResponse =
  AnalyticsResponseEnvelope<AnalyticsComplianceStatsData>;

//
// ─────────────────────────────────────────────────────────────
//  RISK ANALYTICS
// ─────────────────────────────────────────────────────────────
//

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface AnalyticsRiskDistributionItem {
  level: RiskLevel;
  count: number;
}

export interface AnalyticsRiskCategoryItem {
  category: string;
  avgRisk: number;
}

export interface AnalyticsRiskBidderItem {
  bidderId: string;
  name: string;
  avgRisk: number;
}

export interface AnalyticsRiskStatsData {
  riskDistribution: AnalyticsRiskDistributionItem[];
  avgRiskByCategory: AnalyticsRiskCategoryItem[];
  highestRiskBidders: AnalyticsRiskBidderItem[];
}

export type AnalyticsRiskStatsResponse =
  AnalyticsResponseEnvelope<AnalyticsRiskStatsData>;
