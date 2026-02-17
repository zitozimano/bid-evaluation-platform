"use client";

import { WorkflowTimeline } from "./WorkflowTimeline";
import { WorkflowActions } from "./WorkflowActions";
import { WorkflowLog } from "@/types/workflow";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface WorkflowPanelProps {
  tenderId: string;
  workflow: { tenderId: string; currentStage: string | null; logs: WorkflowLog[] };
  evaluationResults: {
    id: string;
    bidderName: string;
    currentStage: string | null;
  }[];
}

export function WorkflowPanel({ workflow, evaluationResults }: WorkflowPanelProps) {
  const { user } = useCurrentUser();

  // For simplicity, drive actions off the leading bidder's result
  const primaryResult = evaluationResults[0];

  return (
    <div className="border rounded p-4 bg-white space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Workflow</h2>
        {workflow.currentStage && (
          <span className="text-sm text-gray-600">
            Current stage: <span className="font-mono">{workflow.currentStage}</span>
          </span>
        )}
      </div>

      <WorkflowTimeline logs={workflow.logs} />

      {user && primaryResult && (
        <WorkflowActions
          resultId={primaryResult.id}
          currentStage={primaryResult.currentStage}
          userRole={user.role}
        />
      )}
    </div>
  );
}
