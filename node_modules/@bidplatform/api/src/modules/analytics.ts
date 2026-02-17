import { createApiClient } from "../client";
import {
  AnalyticsOverviewResponse,
  AnalyticsBidderStatsResponse,
  AnalyticsProcessStatsResponse,
  AnalyticsComplianceStatsResponse,
  AnalyticsRiskStatsResponse
} from "@bidplatform/models";

export function createAnalyticsApi(client: ReturnType<typeof createApiClient>) {
  return {
    /**
     * GET /analytics/overview
     */
    getOverview(): Promise<AnalyticsOverviewResponse> {
      return client.request("/analytics/overview");
    },

    /**
     * GET /analytics/bidders
     */
    getBidderStats(): Promise<AnalyticsBidderStatsResponse> {
      return client.request("/analytics/bidders");
    },

    /**
     * GET /analytics/process
     */
    getProcessStats(): Promise<AnalyticsProcessStatsResponse> {
      return client.request("/analytics/process");
    },

    /**
     * GET /analytics/compliance
     */
    getComplianceStats(): Promise<AnalyticsComplianceStatsResponse> {
      return client.request("/analytics/compliance");
    },

    /**
     * GET /analytics/risk
     */
    getRiskStats(): Promise<AnalyticsRiskStatsResponse> {
      return client.request("/analytics/risk");
    }
  };
}
