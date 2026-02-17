import React from "react";

export type BidWorkflowStepStatus = "pending" | "in-progress" | "completed" | "blocked";

export type BidWorkflowStep = {
  id: string;
  label: string;
  ownerRole: string;
  status: BidWorkflowStepStatus;
};

export function BidWorkflowStepItem({ step }: { step: BidWorkflowStep }) {
  const color =
    step.status === "completed"
      ? "bg-brand"
      : step.status === "in-progress"
      ? "bg-amber-400"
      : step.status === "blocked"
      ? "bg-red-600"
      : "bg-surface-lighter";

  return (
    <div className="flex items-center gap-3 rounded-md border border-surface-lighter bg-surface-light p-3 text-sm">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-text">{step.label}</span>
          <span className="text-xs text-text-muted uppercase">{step.ownerRole}</span>
        </div>
        <div className="text-xs text-text-muted mt-1 capitalize">
          Status: {step.status}
        </div>
      </div>
    </div>
  );
}
