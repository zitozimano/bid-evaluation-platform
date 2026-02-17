import React from "react";

export function RiskIndicator({ level }: { level: "low" | "medium" | "high" }) {
  const color =
    level === "low"
      ? "bg-brand"
      : level === "medium"
      ? "bg-amber-400"
      : "bg-red-600";

  return (
    <span className={`px-2 py-1 rounded-full text-xs text-surface ${color}`}>
      {level.toUpperCase()}
    </span>
  );
}
