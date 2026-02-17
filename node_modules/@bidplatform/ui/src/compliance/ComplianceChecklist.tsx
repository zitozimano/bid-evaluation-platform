import React from "react";
import { ComplianceItem, ComplianceItemRow } from "./ComplianceItem";

export function ComplianceChecklist({
  items,
  onChange
}: {
  items: ComplianceItem[];
  onChange: (items: ComplianceItem[]) => void;
}) {
  const updateItem = (id: string, item: ComplianceItem) => {
    onChange(items.map((x) => (x.id === id ? item : x)));
  };

  const requiredCount = items.filter((i) => i.required).length;
  const requiredChecked = items.filter((i) => i.required && i.checked).length;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs text-text-muted">
        <span>SCM Compliance Checklist</span>
        <span>
          Required satisfied: {requiredChecked}/{requiredCount}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ComplianceItemRow
            key={item.id}
            item={item}
            onChange={(updated) => updateItem(item.id, updated)}
          />
        ))}
      </div>
    </div>
  );
}
