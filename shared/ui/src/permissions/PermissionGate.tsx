import React from "react";
import { UserRole } from "../navigation/roles";

export function PermissionGate({
  allowed,
  role,
  children
}: {
  allowed: UserRole[];
  role: UserRole;
  children: React.ReactNode;
}) {
  if (!allowed.includes(role)) return null;
  return <>{children}</>;
}
