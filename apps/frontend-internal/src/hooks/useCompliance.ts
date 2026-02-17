import { useEffect, useState } from "react";
import { complianceApi } from "../lib/apiClient";
import type { DepartmentRiskHeatmap } from "@bid-eval/api-client";

export function useRiskHeatmap() {
  const [data, setData] = useState<DepartmentRiskHeatmap[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    complianceApi
      .getRiskHeatmap()
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
