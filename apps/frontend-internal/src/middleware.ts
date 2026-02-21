import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = "PMU"; // TODO: replace with real auth

  const path = req.nextUrl.pathname;

  // Protect evaluation routes
  if (path.startsWith("/evaluations")) {
    if (!["PMU", "SCM", "EVALUATOR", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Protect tender management
  if (path.startsWith("/tenders")) {
    if (!["PMU", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
