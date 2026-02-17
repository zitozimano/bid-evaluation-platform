export const EvaluationStates = [
  "DRAFT",
  "IN_PROGRESS",
  "AWAITING_APPROVAL",
  "APPROVED",
  "ARCHIVED"
] as const;

export function canTransition(from: string, to: string) {
  const allowed = {
    DRAFT: ["IN_PROGRESS"],
    IN_PROGRESS: ["AWAITING_APPROVAL"],
    AWAITING_APPROVAL: ["APPROVED"],
    APPROVED: ["ARCHIVED"],
    ARCHIVED: []
  };

  return allowed[from]?.includes(to) ?? false;
}
