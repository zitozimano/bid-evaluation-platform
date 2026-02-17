// types/workflow.ts
export type WorkflowStageCode =
  | 'A' | 'B' | 'C' | 'D'
  | 'E' | 'F' | 'G' | 'H' | 'I';

export interface WorkflowLog {
  id: string;
  evaluationResultId: string;
  stage: WorkflowStageCode;
  daysSpent: number;
  createdAt: string;
  updatedAt: string;
}

// config/workflowStages.ts
import { WorkflowStageCode } from '@/types/workflow';

export const WORKFLOW_STAGES: { code: WorkflowStageCode; label: string; description: string }[] = [
  { code: 'A', label: 'Technical Evaluation', description: 'Functionality scoring completed.' },
  { code: 'B', label: 'Price Evaluation', description: 'Price scoring completed.' },
  { code: 'C', label: 'BBBEE Evaluation', description: 'BBBEE scoring completed.' },
  { code: 'D', label: 'Consolidated Scoring', description: 'Total scores finalised.' },
  { code: 'E', label: 'Internal Audit Review', description: 'Internal audit review completed.' },
  { code: 'F', label: 'CFO Review', description: 'CFO review and sign-off.' },
  { code: 'G', label: 'Final Approval', description: 'Accounting Officer approval.' },
  { code: 'H', label: 'Council Submission', description: 'Submitted to Council.' },
  { code: 'I', label: 'Award Published', description: 'Award published and communicated.' },
];
