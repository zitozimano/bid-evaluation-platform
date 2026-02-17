export type EvaluationEvent =
  | { type: "EVALUATION_CREATED"; evaluationId: string }
  | { type: "EVALUATION_UPDATED"; evaluationId: string }
  | { type: "EVALUATION_SUBMITTED"; evaluationId: string }
  | { type: "EVALUATION_APPROVED"; evaluationId: string };
