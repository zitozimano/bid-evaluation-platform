import React from "react";
import { BidWorkflowStep, BidWorkflowStepItem } from "./BidWorkflowStep";

export function BidWorkflowEngine({
  steps,
  currentStepId
}: {
  steps: BidWorkflowStep[];
  currentStepId?: string;
}) {
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className={currentStepId === step.id ? "ring-2 ring-brand rounded-md" : ""}
        >
          <BidWorkflowStepItem step={step} />
        </div>
      ))}
    </div>
  );
}
