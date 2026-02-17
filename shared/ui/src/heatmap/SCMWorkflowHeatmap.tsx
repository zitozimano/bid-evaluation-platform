import React from "react";

export type WorkflowStageHeat = {
  id: string;
  label: string;
  avgDays: number;
};

export function SCMWorkflowHeatmap({ stages }: { stages: WorkflowStageHeat[] }) {
  const max = Math.max(...stages.map((s) => s.avgDays), 1);

  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-4 space-y-3">
      <div className="flex justify-between items-center text-xs text-text-muted">
        <span>SCM Workflow Heatmap</span>
        <span>Average days per stage</span>
      </div>
      <div className="space-y-2 text-sm">
        {stages.map((s) => {
          const intensity = s.avgDays / max;
          const bg = `rgba(248, 113, 113, ${0.2 + intensity * 0.6})`; // red-ish
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-text">{s.label}</span>
                  <span className="text-text-muted">{s.avgDays.toFixed(1)} days</span>
                </div>
                <div className="h-2 rounded mt-1" style={{ backgroundColor: bg }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
