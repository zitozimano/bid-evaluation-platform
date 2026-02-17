import { useState } from "react";

export function usePost<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function post(body: any): Promise<T | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      return (await res.json()) as T;
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { post, loading, error };
}
