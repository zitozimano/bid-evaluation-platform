"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/analytics/compliance", label: "Compliance Dashboard" },
  { href: "/tenders", label: "Tender Insights" },
  { href: "/bidders", label: "Bidder Intelligence" },
];

export function AnalyticsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-white h-screen sticky top-0">
      <div className="px-4 py-3 text-xs font-semibold text-slate-500">
        Analytics
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded text-sm ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
