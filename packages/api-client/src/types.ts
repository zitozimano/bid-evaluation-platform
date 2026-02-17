export interface Tender {
  id: string;
  number: string;
  description: string;
  category: string | null;
}

export interface Bidder {
  id: string;
  tenderId: string;
  name: string;
  price: number | null;
  disqualified: boolean;
}

export interface EvaluationResult {
  id: string;
  tenderId: string;
  bidderId: string;
  functionalityScore: number;
  qualifies: boolean;
  price: number;
  priceScore: number;
  bbbeeLevel: number | null;
  bbbeePoints: number;
  totalScore: number;
  riskScore: number | null;
  complianceRate: number | null;
  exceptionsCount: number;
  slaBreached: boolean;
  currentStage: string | null;
}

export interface AnalyticsSummary {
  complianceRate: number;
  riskScore: number;
  exceptionStats: {
    total: number;
    average: number;
  };
  slaStats: {
    breached: number;
    ok: number;
  };
  stageDistribution: { stage: string; count: number }[];
}

export interface BidderPerformance {
  bidderId: string;
  name: string;
  totalScore: number;
  functionalityScore: number;
  priceScore: number;
  price: number;
  bbbeePoints: number;
  riskScore: number | null;
  complianceRate: number | null;
  exceptionsCount: number;
  slaBreached: boolean;
  currentStage: string | null;
}

export interface EvidenceItem {
  id: string;
  bidderId: string;
  type: string;
  url: string;
  metadata: any;
}

export interface HealthStatus {
  status: string;
  version?: string;
  db?: string;
}

export interface PublicVerificationResult {
  valid: boolean;
  tenderId: string | null;
  runNumber: number | null;
}
