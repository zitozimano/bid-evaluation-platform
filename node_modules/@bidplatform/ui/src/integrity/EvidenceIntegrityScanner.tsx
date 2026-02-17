import React from "react";
import { IntegrityScanResult, IntegrityScanRow } from "./IntegrityScanRow";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function EvidenceIntegrityScanner({
  results,
  onScan
}: {
  results: IntegrityScanResult[];
  onScan: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">AGSA Evidence Integrity Scanner</h3>
        <PrimaryButton type="button" onClick={onScan}>
          Run scan
        </PrimaryButton>
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-surface-lighter text-xs text-text">
            <tr>
              <th className="px-3 py-2 text-left">File</th>
              <th className="px-3 py-2 text-left">Hash</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <IntegrityScanRow key={r.id} item={r} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
