"use client";

import { getSessionUser } from "@/lib/auth/session";

export function Can({ roles, children }: { roles: string[]; children: any }) {
  const user = getSessionUser();
  if (roles.includes(user.role)) return children;
  return null;
}
