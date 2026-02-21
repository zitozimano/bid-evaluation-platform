"use client";

import { useEffect, useState } from "react";
import { fetchTenders } from "../lib/api/tenders";

export function useTenders() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTenders().then(setData);
  }, []);

  return data;
}
