import React from "react";

export type SCMException = {
  id: string;
  reason: string;
  raisedBy: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
};

export function ExceptionItem({ item }: { item: SCMException }) {
  const color =
    item.status === "approved"
      ? "text-brand"
      : item.status === "rejected"
      ? "text-red-400"
      : "text-text-muted";

  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-3 text-sm space-y-1">
      <div className="flex justify-between">
        <span className="font-medium text-text">{item.reason}</span>
        <span className={`text-xs uppercase ${color}`}>{item.status}</span>
      </div>
      <div className="text-xs text-text-muted">
        Raised by {item.raisedBy} on {item.timestamp}
      </div>
    </div>
  );
}
