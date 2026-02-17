import React from "react";

export function AuditBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-lighter text-xs text-text-muted">
      {label}
    </span>
  );
}
