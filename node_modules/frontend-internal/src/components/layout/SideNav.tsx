"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth/AuthContext";

export function SideNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const canSeeAdmin =
    user && ["AUDIT", "INTERNAL-AUDIT", "ADMIN"].includes(user.role);

  function item(path: string, label: string) {
    const active = pathname.startsWith(path);
    return (
      <Link
        href={path}
        className={`block px-3 py-2 rounded text-sm ${
          active
            ? "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <nav className="w-56 bg-slate-900 text-slate-100 flex flex-col">
      <div className="px-4 py-3 text-sm font-semibold">
        Bid Evaluation Platform
      </div>

      <div className="flex-1 space-y-1 px-2">
        {item("/dashboard", "Dashboard")}
        {item("/tenders", "Tenders")}

        {canSeeAdmin && (
          <>
            <div className="mt-4 px-2 text-xs uppercase text-slate-500">
              Audit & Analytics
            </div>
            {item("/admin/verification-logs", "Verification Logs")}
            {item("/admin/verification-analytics", "Verification Analytics")}
          </>
        )}
      </div>
    </nav>
  );
}
