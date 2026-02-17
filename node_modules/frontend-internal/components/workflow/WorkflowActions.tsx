"use client";

import { useState } from "react";
import { WORKFLOW_STAGES } from "@/config/workflowStages";
import { WorkflowLog } from "@/types/workflow";

interface Props {
  resultId: string;
  currentStage: string | null;
  userRole: string;
}

const ROLE_ALLOWED_STAGES: Record<string, string[]> = {
  SCM: ["A", "B", "C", "D", "H", "I"],
  AUDIT: ["E"],
  CFO: ["F"],
  AO: ["G"],
};

export function WorkflowActions({ resultId, currentStage, userRole }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allowedStages = ROLE_ALLOWED_STAGES[userRole] ?? [];

  const nextStage = (() => {
    if (!currentStage) return "A";
    const index = WORKFLOW_STAGES.findIndex((s) => s.code === currentStage);
    return WORKFLOW_STAGES[index + 1]?.code ?? null;
  })();

  const canMove = nextStage && allowedStages.includes(nextStage);

  async function moveStage() {
    if (!nextStage) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/evaluation-results/${resultId}/workflow-log`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: nextStage }),
        }
      );

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Failed to move stage");
      }

      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!canMove) return null;

  const stageMeta = WORKFLOW_STAGES.find((s) => s.code === nextStage);

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Workflow Action</h3>

      <button
        onClick={moveStage}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Move to Stage {nextStage}: {stageMeta?.label}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
