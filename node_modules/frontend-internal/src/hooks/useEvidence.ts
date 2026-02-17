import { useEffect, useState } from "react";
import { evidenceApi } from "../lib/apiClient";
import type { EvidenceItem } from "@bid-eval/api-client";

export function useEvidenceByBidder(bidderId: string | null) {
  const [data, setData] = useState<EvidenceItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!bidderId) return;
    setLoading(true);
    setError(null);

    evidenceApi
      .listByBidder(bidderId)
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [bidderId]);

  return { data, loading, error };
}
