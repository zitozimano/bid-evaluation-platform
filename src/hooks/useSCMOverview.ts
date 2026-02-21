"use client";

import { useEffect, useState } from "react";
import { fetchSCMOverview } from "../lib/api/scm";

export function useSCMOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSCMOverview().then(setData);
  }, []);

  return data;
}
