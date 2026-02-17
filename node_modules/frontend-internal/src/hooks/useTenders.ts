import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

interface TenderSummary {
  id: string;
  number: string;
  description: string;
  category: string | null;
  createdAt: string;
}

export function useTenders() {
  const [data, setData] = useState<TenderSummary[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/tenders")
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
