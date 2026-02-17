import React from "react";
import { roleNav, UserRole } from "./roles";

export function RoleSidebar({ role }: { role: UserRole }) {
  const items = roleNav.filter((i) => i.roles.includes(role));

  return (
    <aside className="w-64 bg-surface-light h-screen p-4 border-r border-surface-lighter">
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-md text-text-muted hover:bg-surface-lighter hover:text-text transition"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
