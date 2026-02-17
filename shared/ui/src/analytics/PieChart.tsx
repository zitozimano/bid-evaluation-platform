import React from "react";

export function PieChart({
  value,
  total,
  className = ""
}: {
  value: number;
  total: number;
  className?: string;
}) {
  const pct = total === 0 ? 0 : (value / total) * 100;
  const strokeDasharray = `${pct} ${100 - pct}`;

  return (
    <svg viewBox="0 0 36 36" className={`w-20 h-20 ${className}`}>
      <path
        className="text-surface-lighter"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
      />
      <path
        className="text-brand"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset="25"
        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
      />
      <text
        x="18"
        y="20"
        textAnchor="middle"
        className="fill-current text-xs"
      >
        {Math.round(pct)}%
      </text>
    </svg>
  );
}
