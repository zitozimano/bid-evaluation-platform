"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

const sections = [
  {
    label: "Analytics",
    items: [
      { href: "/analytics/overview", label: "Overview" },
      { href: "/analytics/bidders", label: "Bidders" },
      { href: "/analytics/process", label: "Process" },
      { href: "/analytics/compliance", label: "Compliance" },
      { href: "/analytics/risk", label: "Risk" }
    ]
  },
  {
    label: "Admin",
    items: [
      { href: "/admin/scm-assignments", label: "SCM Assignments" }
    ]
  },
  {
    label: "Audit",
    items: [
      { href: "/audit/analytics", label: "Analytics Access" }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-4 font-semibold text-lg">Bid Evaluation</div>
      <nav className="px-2 space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
