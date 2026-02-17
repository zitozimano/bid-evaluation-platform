import React from "react";
import { KpiCard } from "../dashboard/KpiCard";
import { CircularComplianceEngine, CircularRule } from "../circular/CircularComplianceEngine";

export type TreasuryComplianceDashboardProps = {
  totalCirculars: number;
  compliantCirculars: number;
  openFindings: number;
  rules: CircularRule[];
  onRulesChange: (rules: CircularRule[]) => void;
};

export function TreasuryComplianceDashboard({
  totalCirculars,
  compliantCirculars,
  openFindings,
  rules,
  onRulesChange
}: TreasuryComplianceDashboardProps) {
  const compliancePct =
    totalCirculars === 0 ? 0 : (compliantCirculars / totalCirculars) * 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <KpiCard
          label="Circulars compliant"
          value={`${compliantCirculars}/${totalCirculars}`}
          helper={`${compliancePct.toFixed(1)}%`}
        />
        <KpiCard
          label="Open Treasury findings"
          value={openFindings}
          helper="Requires follow-up"
        />
        <KpiCard
          label="Overall compliance"
          value={`${compliancePct.toFixed(1)}%`}
          helper="Target ≥ 95%"
        />
      </div>

      <div className="rounded-md border border-surface-lighter bg-surface-light p-4">
        <CircularComplianceEngine rules={rules} onChange={onRulesChange} />
      </div>
    </div>
  );
}
