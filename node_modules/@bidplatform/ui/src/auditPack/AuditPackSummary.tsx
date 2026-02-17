import React from "react";

export type AuditPackSection = {
  id: string;
  label: string;
  included: boolean;
  description?: string;
};

export function AuditPackSummary({
  sections
}: {
  sections: AuditPackSection[];
}) {
  return (
    <div className="space-y-2 text-sm">
      {sections.map((s) => (
        <div
          key={s.id}
          className="flex items-start justify-between gap-3 rounded-md border border-surface-lighter bg-surface-light p-3"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-text">{s.label}</span>
              <span
                className={`text-[10px] uppercase ${
                  s.included ? "text-brand" : "text-text-muted"
                }`}
              >
                {s.included ? "Included" : "Missing"}
              </span>
            </div>
            {s.description && (
              <p className="mt-1 text-xs text-text-muted">{s.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
