"use client";

import { useEffect, useState } from "react";
import { fetchPMUOverview } from "../lib/api/pmu";

export function usePMUOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchPMUOverview().then(setData);
  }, []);

  return data;
}
