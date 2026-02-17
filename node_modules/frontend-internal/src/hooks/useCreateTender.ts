import { useState } from "react";
import { apiClient } from "../lib/apiClient";

export function useCreateTender() {
  const [loading, setLoading] = useState(false);

  async function createTender(input: {
    number: string;
    description: string;
    category?: string | null;
  }) {
    setLoading(true);
    try {
      return await apiClient.post("/tenders", input);
    } finally {
      setLoading(false);
    }
  }

  return { createTender, loading };
}
