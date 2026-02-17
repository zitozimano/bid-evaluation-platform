import React from "react";
import { UserRole } from "../navigation/roles";

export function RequirePermission({
  allowed,
  role,
  fallback = null,
  children
}: {
  allowed: UserRole[];
  role: UserRole;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  return allowed.includes(role) ? <>{children}</> : <>{fallback}</>;
}
