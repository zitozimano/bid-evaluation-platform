import React from "react";

export type RiskFactor = {
  id: string;
  label: string;
  score: number; // 0–100
};

export function RiskFactorRow({ factor }: { factor: RiskFactor }) {
  return (
    <div className="flex justify-between items-center border-b border-surface-lighter py-2 text-sm">
      <span className="text-text">{factor.label}</span>
      <span className="text-text-muted">{factor.score}/100</span>
    </div>
  );
}
