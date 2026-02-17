import React from "react";
import { RiskFactor, RiskFactorRow } from "./RiskFactorRow";
import { RiskIndicator } from "./RiskIndicator";

export function BidderRiskProfile({
  bidder,
  factors
}: {
  bidder: string;
  factors: RiskFactor[];
}) {
  const total = factors.reduce((a, b) => a + b.score, 0);
  const avg = total / factors.length;

  const level =
    avg < 35 ? "low" : avg < 70 ? "medium" : "high";

  return (
    <div className="rounded-md bg-surface-light border border-surface-lighter p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold">{bidder}</h3>
        <RiskIndicator level={level} />
      </div>

      <div className="space-y-1">
        {factors.map((f) => (
          <RiskFactorRow key={f.id} factor={f} />
        ))}
      </div>

      <div className="text-xs text-text-muted">
        Average risk score: {avg.toFixed(1)}
      </div>
    </div>
  );
}
