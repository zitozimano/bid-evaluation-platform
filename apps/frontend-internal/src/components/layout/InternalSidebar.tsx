"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/tenders/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Notifications", href: "/notifications" },
  { label: "Permissions Matrix", href: "/tenders/permissions" },
  { label: "Council Pack v2", href: "/tenders/council-pack-v2-demo" },
  {
    label: "Admin",
    children: [
      { label: "Users & Roles", href: "/admin/roles" },
      { label: "Notification Rules", href: "/admin/notifications/rules" },
    ],
  },
];

export function InternalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen p-4 space-y-4">
      <div className="text-lg font-bold">Bid Evaluation</div>
      <nav className="space-y-2 text-sm">
        {nav.map((item) =>
          item.children ? (
            <div key={item.label}>
              <div className="text-xs uppercase text-slate-400 mb-1">
                {item.label}
              </div>
              <div className="space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block px-2 py-1 rounded ${
                      pathname.startsWith(child.href)
                        ? "bg-slate-700"
                        : "hover:bg-slate-800"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-2 py-1 rounded ${
                pathname === item.href
                  ? "bg-slate-700"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}
