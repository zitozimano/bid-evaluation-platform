import { useEffect, useState } from "react";
import { biddersApi } from "../lib/apiClient";
import type { Bidder } from "@bid-eval/api-client";

export function useBidders(tenderId: string | null) {
  const [data, setData] = useState<Bidder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tenderId) return;
    setLoading(true);
    setError(null);

    biddersApi
      .listByTender(tenderId)
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [tenderId]);

  return { data, loading, error };
}
