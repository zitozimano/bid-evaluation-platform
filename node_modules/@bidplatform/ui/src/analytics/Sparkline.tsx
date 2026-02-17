import React from "react";

export function Sparkline({
  data,
  className = ""
}: {
  data: number[];
  className?: string;
}) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className={`w-full h-8 ${className}`}>
      <polyline
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
