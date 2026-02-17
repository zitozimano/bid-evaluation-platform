import React from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";

export type EvidencePackItem = {
  id: string;
  label: string;
  type: string;
  included: boolean;
};

export function AuditEvidencePackCompiler({
  items,
  onToggle,
  onCompile
}: {
  items: EvidencePackItem[];
  onToggle: (id: string) => void;
  onCompile: () => void;
}) {
  const allIncluded = items.every((i) => i.included);

  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">AGSA Audit Evidence Pack</h3>
        <PrimaryButton type="button" onClick={onCompile} disabled={!allIncluded}>
          Compile pack
        </PrimaryButton>
      </div>

      {!allIncluded && (
        <p className="text-xs text-amber-400">
          Some evidence items are not included. Mark all required items before compiling.
        </p>
      )}

      <div className="space-y-2 text-sm">
        {items.map((i) => (
          <div
            key={i.id}
            className="flex justify-between items-center border-b border-surface-lighter py-2"
          >
            <div>
              <div className="text-text">{i.label}</div>
              <div className="text-xs text-text-muted">{i.type}</div>
            </div>
            <input
              type="checkbox"
              checked={i.included}
              onChange={() => onToggle(i.id)}
              className="w-4 h-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
