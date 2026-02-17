import React from "react";

export type TimelineEvent = {
  id: string;
  label: string;
  actor: string;
  timestamp: string;
  status: "pending" | "in-progress" | "completed";
};

export function EvaluationTimeline({ events }: { events: TimelineEvent[] }) {
  if (!events.length) {
    return <p className="text-text-muted text-sm">No evaluation events recorded.</p>;
  }

  return (
    <div className="space-y-4">
      {events.map((e, index) => (
        <div key={e.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                e.status === "completed"
                  ? "bg-brand"
                  : e.status === "in-progress"
                  ? "bg-amber-400"
                  : "bg-surface-lighter"
              }`}
            />

            {index < events.length - 1 && (
              <div className="flex-1 w-px bg-surface-lighter mt-1" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-text">{e.label}</span>
              <span className="text-text-muted">{e.timestamp}</span>
            </div>

            <div className="text-xs text-text-muted mt-1">
              <span className="font-semibold">Actor:</span> {e.actor}
            </div>

            <div className="text-xs text-text-muted mt-1 capitalize">
              <span className="font-semibold">Status:</span> {e.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
