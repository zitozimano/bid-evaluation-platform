export interface VerificationResultDto {
  tenderNumber: string;
  hash: string;
  verified: boolean;
  winner: {
    bidderId: string;
    name: string;
    totalScore: number;
  };
  workflowStages: {
    stage: string;
    label: string;
    createdAt: string | Date;
  }[];
}
