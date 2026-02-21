// apps/frontend-internal/src/lib/auth/session.ts

import jwtDecode from "jwt-decode";
import { getToken } from "./client";

export type Role =
  | "ADMIN"
  | "PMU"
  | "SCM"
  | "EVALUATOR"
  | "IA"
  | "CFO";

export interface SessionUser {
  id: string;
  username: string;
  role: Role;
}

export function getSessionUser(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const token = getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    return {
      id: decoded.sub,
      username: decoded.username,
      role: decoded.role
    };
  } catch (err) {
    console.error("Invalid JWT:", err);
    return null;
  }
}
