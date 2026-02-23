import React from "react";
import Link from "next/link";

export const Sidebar = ({ items }: { items: { label: string; href: string }[] }) => (
  <aside className="w-64 h-screen bg-gray-900 text-white p-4">
    <h2 className="text-xl font-bold mb-6">Dashboard</h2>
    <nav className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </aside>
);
