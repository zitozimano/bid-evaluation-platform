export const EvaluationStates = [
  "DRAFT",
  "IN_PROGRESS",
  "AWAITING_APPROVAL",
  "APPROVED",
  "ARCHIVED"
] as const;

export type EvaluationState = typeof EvaluationStates[number];

const transitions: Record<EvaluationState, EvaluationState[]> = {
  DRAFT: ["IN_PROGRESS"],
  IN_PROGRESS: ["AWAITING_APPROVAL"],
  AWAITING_APPROVAL: ["APPROVED"],
  APPROVED: ["ARCHIVED"],
  ARCHIVED: []
};

export function canTransition(from: EvaluationState, to: EvaluationState) {
  return transitions[from].includes(to);
}

export function assertTransition(from: EvaluationState, to: EvaluationState) {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid transition: ${from} → ${to}`);
  }
}
