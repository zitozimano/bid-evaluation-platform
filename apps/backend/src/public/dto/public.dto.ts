export class TenderSummaryDto {
  id!: string;
  number!: string;
  name!: string;
  stage!: string;
  runNumber!: number | null;
  runHash!: string | null;
  evaluationResults!: {
    bidderName: string;
    totalScore: number;
  }[];
  rankings!: {
    rank: number;
    bidderId: string;
    bidderName: string;
    totalScore: number;
  }[];
  complianceDashboard!: unknown | null;
}

export class CouncilPackDto {
  tenderId!: string;
  url!: string;
  createdAt!: Date;
}

export class PublishedTenderItemDto {
  id!: string;
  number!: string;
  description!: string | null;
  publishedAt!: Date;
  runNumber!: number | null;
  runHash!: string | null;
  topBidder!: string | null;
}

export class PublishedTenderListDto {
  items!: PublishedTenderItemDto[];
  page!: number;
  pageSize!: number;
  total!: number;
  pageCount!: number;
}

export class VerifyHashDto {
  verified!: boolean;
  tenderId!: string;
  hash!: string;
  runNumber!: number | null;
  runHash!: string | null;
  bidderId!: string | null;
  bidderName!: string | null;
  totalScore!: number | null;
  qualifies!: boolean | null;
}

export class VerifyRunDto {
  verified!: boolean;
  tenderId!: string;
  runNumber!: number;
  runHash!: string | null;
  resultCount!: number;
}
