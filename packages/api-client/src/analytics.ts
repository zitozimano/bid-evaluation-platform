import { ApiClient } from "./http";
import { AnalyticsSummary, BidderPerformance } from "./types";

export class AnalyticsApi {
  constructor(private client: ApiClient) {}

  getSummary(tenderId: string) {
    return this.client.get<AnalyticsSummary>(`/analytics/${tenderId}`);
  }

  getPerformance(tenderId: string) {
    return this.client.get<BidderPerformance[]>(
      `/analytics/${tenderId}/performance`
    );
  }
}
