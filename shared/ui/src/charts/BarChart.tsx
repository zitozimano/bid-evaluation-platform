import React from "react";

export function BarChart({
  data,
  color = "#10b981",
  className = ""
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const max = Math.max(...data);

  return (
    <div className={`flex items-end gap-2 h-full ${className}`}>
      {data.map((v, i) => (
        <div
          key={i}
          className="w-4 rounded bg-brand"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color }}
        />
      ))}
    </div>
  );
}
