import React from "react";
import { NavLink } from "./types";

export function Sidebar({
  items,
  className = ""
}: {
  items: NavLink[];
  className?: string;
}) {
  return (
    <aside className={`w-64 bg-surface-light h-screen p-4 border-r border-surface-lighter ${className}`}>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <a
            key={item.label}
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
