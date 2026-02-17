import { useEffect, useState } from "react";
import { healthApi } from "../lib/apiClient";
import type { HealthStatus } from "@bid-eval/api-client";

export function useHealth() {
  const [data, setData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    healthApi
      .getReadiness()
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
