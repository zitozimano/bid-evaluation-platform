"use client";

import { useAuth } from "../context/AuthContext";

export function RequireRole({
  role,
  children,
}: {
  role: string;
  children: any;
}) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <div>Access denied</div>;
  }

  return children;
}
