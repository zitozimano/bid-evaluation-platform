import React from "react";

export type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details?: string;
};

export function AuditTrailList({ entries }: { entries: AuditEntry[] }) {
  if (!entries.length) {
    return <p className="text-text-muted text-sm">No audit entries recorded.</p>;
  }

  return (
    <div className="space-y-2 text-sm">
      {entries.map((e) => (
        <div
          key={e.id}
          className="rounded-md bg-surface-light border border-surface-lighter p-3"
        >
          <div className="flex justify-between">
            <span className="font-medium text-text">{e.action}</span>
            <span className="text-text-muted">{e.timestamp}</span>
          </div>
          <div className="text-text-muted mt-1">
            <span className="font-semibold">Actor:</span> {e.actor}
          </div>
          {e.details && (
            <div className="text-text-muted mt-1">
              <span className="font-semibold">Details:</span> {e.details}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
