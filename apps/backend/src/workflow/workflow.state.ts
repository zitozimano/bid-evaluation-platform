export type WorkflowStage =
  | "A" | "B" | "C" | "D"
  | "E" | "F" | "G" | "H" | "I";

export const WORKFLOW_TRANSITIONS: Record<WorkflowStage, WorkflowStage[]> = {
  A: ["B"],
  B: ["C"],
  C: ["D"],
  D: ["E"],
  E: ["F"],
  F: ["G"],
  G: ["H"],
  H: ["I"],
  I: [],
};

export function canTransition(from: WorkflowStage | null, to: WorkflowStage): boolean {
  if (from === null) return to === "A";
  return WORKFLOW_TRANSITIONS[from].includes(to);
}
