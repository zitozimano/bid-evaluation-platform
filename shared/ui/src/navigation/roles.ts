export type UserRole = "SCM" | "CFO" | "IA" | "BUDGET" | "ADMIN";

export type RoleNavItem = {
  label: string;
  href: string;
  roles: UserRole[];
};

export const roleNav: RoleNavItem[] = [
  { label: "Dashboard", href: "/dashboard", roles: ["SCM", "CFO", "IA", "BUDGET", "ADMIN"] },
  { label: "Bids", href: "/bids", roles: ["SCM", "ADMIN"] },
  { label: "Evaluations", href: "/evaluations", roles: ["SCM", "IA", "ADMIN"] },
  { label: "Financial Review", href: "/finance", roles: ["CFO", "ADMIN"] },
  { label: "Compliance", href: "/compliance", roles: ["IA", "ADMIN"] },
  { label: "Budget Alignment", href: "/budget", roles: ["BUDGET", "ADMIN"] }
];
