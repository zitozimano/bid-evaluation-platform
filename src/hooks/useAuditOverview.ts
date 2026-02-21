"use client";

import { useEffect, useState } from "react";
import { fetchAuditOverview } from "../lib/api/audit";

export function useAuditOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAuditOverview().then(setData);
  }, []);

  return data;
}
