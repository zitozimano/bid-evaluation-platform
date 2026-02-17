import React from "react";

export type CircularRule = {
  id: string;
  clause: string;
  description: string;
  compliant: boolean;
};

export function CircularRuleRow({
  rule,
  onToggle
}: {
  rule: CircularRule;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-start border-b border-surface-lighter py-2 text-sm">
      <div>
        <div className="text-text font-medium">{rule.clause}</div>
        <div className="text-xs text-text-muted">{rule.description}</div>
      </div>
      <input
        type="checkbox"
        checked={rule.compliant}
        onChange={() => onToggle(rule.id)}
        className="w-4 h-4"
      />
    </div>
  );
}
