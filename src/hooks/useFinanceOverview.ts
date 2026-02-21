"use client";

import { useEffect, useState } from "react";
import { fetchFinanceOverview } from "../lib/api/finance";

export function useFinanceOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchFinanceOverview().then(setData);
  }, []);

  return data;
}
