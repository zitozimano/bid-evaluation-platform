"use client";

import { useEffect, useState } from "react";
import { WorkflowLog } from "@/types/workflow";

interface WorkflowTimelineResponse {
  tenderId: string;
  currentStage: string | null;
  logs: WorkflowLog[];
}

export function useWorkflowLogs(tenderId: string) {
  const [data, setData] = useState<WorkflowTimelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenderId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tenderId}/workflow`, {
      cache: "no-store",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load workflow");
        const json = (await res.json()) as WorkflowTimelineResponse;
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load workflow");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tenderId]);

  return { data, loading, error };
}
