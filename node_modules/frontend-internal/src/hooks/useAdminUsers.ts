import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export function useAdminUsers() {
  const [data, setData] = useState<AdminUser[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/admin/users")
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
