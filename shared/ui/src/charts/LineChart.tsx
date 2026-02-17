import React from "react";

export function LineChart({
  data,
  stroke = "#10b981",
  className = ""
}: {
  data: number[];
  stroke?: string;
  className?: string;
}) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`}>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
