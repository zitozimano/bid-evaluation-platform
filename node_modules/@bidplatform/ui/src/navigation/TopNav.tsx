import React from "react";

export function TopNav({
  title,
  right,
  className = ""
}: {
  title: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`w-full bg-surface-light border-b border-surface-lighter px-6 py-3 flex items-center justify-between ${className}`}>
      <h1 className="text-text text-lg font-semibold">{title}</h1>
      <div>{right}</div>
    </header>
  );
}
