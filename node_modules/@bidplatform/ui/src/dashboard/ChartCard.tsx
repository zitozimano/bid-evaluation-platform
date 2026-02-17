import React from "react";

export function ChartCard({
  title,
  children,
  className = ""
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-surface-light rounded-lg p-4 shadow-card ${className}`}>
      <h3 className="text-text font-semibold mb-3">{title}</h3>
      <div className="h-40 flex items-center justify-center text-text-muted">
        {children}
      </div>
    </div>
  );
}
