export type UserRole = "SCM" | "AUDIT" | "CFO" | "AO" | "ADMIN";

export const WORKFLOW_ROLE_PERMISSIONS: Record<string, UserRole[]> = {
  A: ["SCM"],
  B: ["SCM"],
  C: ["SCM"],
  D: ["SCM"],
  E: ["AUDIT"],
  F: ["CFO"],
  G: ["AO"],
  H: ["SCM"],
  I: ["SCM"],
};

export function canRoleMoveStage(role: UserRole, stage: string): boolean {
  const allowed = WORKFLOW_ROLE_PERMISSIONS[stage];
  return allowed?.includes(role) ?? false;
}
