export interface PublicTenderSummary {
  tenderId: string;
  tenderNumber: string;
  name: string;
  stage: string;
  latestRunNumber: number | null;
  latestRunHash: string | null;
  topBidderName: string | null;
  topBidderScore: number | null;
}

export interface RunVerificationResponse {
  verified: boolean;
  tenderId: string;
  runNumber: number;
  runHash: string;
  evaluationDate?: string;
  resultCount?: number;
  message?: string;
}

export interface ResultVerificationResponse {
  verified: boolean;
  tenderId: string;
  bidderName: string;
  totalScore: number;
  qualified: boolean;
  runNumber: number;
  runHash: string;
  message?: string;
}

export interface CouncilPackResponse {
  tenderId: string;
  runNumber: number;
  runHash: string;
  url?: string; // if you return a PDF URL
  generatedAt?: string;
}
