import React from "react";

export function KpiCard({
  label,
  value,
  icon,
  className = ""
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-surface-light rounded-lg p-4 shadow-card flex items-center gap-4 ${className}`}>
      {icon && <div className="text-brand">{icon}</div>}
      <div>
        <p className="text-text-muted text-sm">{label}</p>
        <p className="text-text text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
