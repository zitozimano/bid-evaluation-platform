import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

interface Bidder {
  id: string;
  name: string;
  price: number | null;
  disqualified: boolean;
}

export function useBiddersByTender(tenderId: string | null) {
  const [data, setData] = useState<Bidder[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tenderId) return;
    setLoading(true);
    apiClient
      .get(`/tenders/${tenderId}/bidders`)
      .then(setData)
      .finally(() => setLoading(false));
  }, [tenderId]);

  return { data, loading };
}
