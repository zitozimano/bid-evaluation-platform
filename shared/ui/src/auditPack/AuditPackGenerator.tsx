import React from "react";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { AuditPackSection, AuditPackSummary } from "./AuditPackSummary";

export function AuditPackGenerator({
  sections,
  onGenerate
}: {
  sections: AuditPackSection[];
  onGenerate: () => void;
}) {
  const allIncluded = sections.every((s) => s.included);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">AGSA Audit Pack</h3>
        <PrimaryButton type="button" onClick={onGenerate} disabled={!allIncluded}>
          Generate pack
        </PrimaryButton>
      </div>
      {!allIncluded && (
        <p className="text-xs text-amber-400">
          Some required sections are missing. Complete them before generating the pack.
        </p>
      )}
      <AuditPackSummary sections={sections} />
    </div>
  );
}
