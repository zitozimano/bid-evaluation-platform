import { useEffect, useState } from "react";
import { evaluationApi } from "../lib/apiClient";
import type { EvaluationResult } from "@bid-eval/api-client";

export function useEvaluationResults(tenderId: string | null) {
  const [data, setData] = useState<EvaluationResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tenderId) return;
    setLoading(true);
    setError(null);

    evaluationApi
      .getResults(tenderId)
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [tenderId]);

  return { data, loading, error };
}

export function useRunEvaluation(tenderId: string | null) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function run() {
    if (!tenderId) return;
    setRunning(true);
    setError(null);
    try {
      await evaluationApi.run(tenderId);
    } catch (e: any) {
      setError(e);
    } finally {
      setRunning(false);
    }
  }

  return { run, running, error };
}
