import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

interface AnalyticsSummary {
  tenderId: string;
  avgScore: number;
  minScore: number;
  maxScore: number;
  bidderCount: number;
}

interface BidderPerformance {
  bidderId: string;
  name: string;
  totalScore: number;
  functionalityScore: number;
  priceScore: number;
  price: number;
  bbbeePoints: number;
  riskScore: number | null;
}

export function useAnalyticsSummary(tenderId: string | null) {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    if (!tenderId) {
      setData(null);
      return;
    }
    apiClient
      .get<AnalyticsSummary>(`/analytics/summary?tenderId=${tenderId}`)
      .then(setData)
      .catch(() => setData(null));
  }, [tenderId]);

  return { data };
}

export function useBidderPerformance(tenderId: string | null) {
  const [data, setData] = useState<BidderPerformance[] | null>(null);

  useEffect(() => {
    if (!tenderId) {
      setData(null);
      return;
    }
    apiClient
      .get<BidderPerformance[]>(
        `/analytics/bidder-performance?tenderId=${tenderId}`
      )
      .then(setData)
      .catch(() => setData(null));
  }, [tenderId]);

  return { data };
}
