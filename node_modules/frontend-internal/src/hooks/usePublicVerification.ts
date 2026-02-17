import { useEffect, useState } from "react";
import { publicApi } from "../lib/apiClient";
import type { PublicVerificationResult } from "@bid-eval/api-client";

export function usePublicVerification(hash: string | null) {
  const [data, setData] = useState<PublicVerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!hash) return;
    setLoading(true);
    setError(null);

    publicApi
      .verify(hash)
      .then(setData)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [hash]);

  return { data, loading, error };
}
