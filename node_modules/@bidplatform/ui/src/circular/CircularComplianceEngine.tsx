import React from "react";
import { CircularRule, CircularRuleRow } from "./CircularRuleRow";

export function CircularComplianceEngine({
  rules,
  onChange
}: {
  rules: CircularRule[];
  onChange: (rules: CircularRule[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(
      rules.map((r) =>
        r.id === id ? { ...r, compliant: !r.compliant } : r
      )
    );
  };

  const compliantCount = rules.filter((r) => r.compliant).length;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-text-muted">
        <span>Treasury Circular Compliance</span>
        <span>
          {compliantCount}/{rules.length} compliant
        </span>
      </div>

      <div className="space-y-2">
        {rules.map((r) => (
          <CircularRuleRow key={r.id} rule={r} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
}
