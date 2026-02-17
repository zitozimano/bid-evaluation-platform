import React from "react";
import { Checkbox } from "../form/Checkbox";

export type ComplianceItem = {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
  notes?: string;
};

export function ComplianceItemRow({
  item,
  onChange
}: {
  item: ComplianceItem;
  onChange: (item: ComplianceItem) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-surface-lighter bg-surface-light p-3 text-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={item.checked}
            onChange={(e) => onChange({ ...item, checked: e.target.checked })}
          />
          <span className="text-text">{item.label}</span>
          {item.required && (
            <span className="text-[10px] text-amber-400 uppercase">
              Required
            </span>
          )}
        </div>
        {item.notes && (
          <p className="mt-1 text-xs text-text-muted">{item.notes}</p>
        )}
      </div>
    </div>
  );
}
