import React from "react";

export function Breadcrumbs({
  items,
  className = ""
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav className={`flex items-center gap-2 text-text-muted ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.href ? (
            <a href={item.href} className="hover:text-text transition">
              {item.label}
            </a>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
