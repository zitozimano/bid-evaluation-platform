export type CreateEvaluationDTO = {
  bidId: string;
};

export type UpdateEvaluationDTO = {
  scores?: { criterionId: string; score: number }[];
  evidence?: { id: string; provided: boolean }[];
  compliance?: { id: string; compliant: boolean }[];
  risk?: { id: string; score: number }[];
  state?: string;
};

export type SubmitEvaluationDTO = {
  evaluationId: string;
};
