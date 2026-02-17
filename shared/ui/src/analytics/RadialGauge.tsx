import React from "react";

export function RadialGauge({
  value,
  max = 100,
  className = ""
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const angle = pct * 180 - 90;

  return (
    <svg viewBox="0 0 100 60" className={`w-32 h-20 ${className}`}>
      <path
        d="M10 50 A40 40 0 0 1 90 50"
        fill="none"
        stroke="#1e293b"
        strokeWidth="6"
      />
      <line
        x1="50"
        y1="50"
        x2={50 + 35 * Math.cos((Math.PI * angle) / 180)}
        y2={50 + 35 * Math.sin((Math.PI * angle) / 180)}
        stroke="#10b981"
        strokeWidth="4"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        className="fill-current text-xs"
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}
