export type Role = "SCM" | "CFO" | "AUDIT" | "ADMIN";

export const PermissionsMatrix: Record<Role, string[]> = {
  SCM: [
    "bidders:read",
    "bidders:write",
    "evaluation:run",
    "evidence:write",
    "evidence:read",
  ],
  CFO: [
    "bidders:read",
    "evaluation:read",
    "analytics:read",
    "audit:read",
  ],
  AUDIT: [
    "audit:read",
    "analytics:read",
    "evidence:read",
  ],
  ADMIN: [
    "bidders:read",
    "bidders:write",
    "evaluation:run",
    "evaluation:read",
    "analytics:read",
    "evidence:read",
    "evidence:write",
    "audit:read",
    "users:manage",
  ],
};
