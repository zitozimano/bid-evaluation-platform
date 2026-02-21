"use client";

import { useEffect, useState } from "react";
import { fetchTender } from "../lib/api/tenders";

export function useTender(id: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTender(id).then(setData);
  }, [id]);

  return data;
}
