"use client";

import { useEffect, useState } from "react";
import { fetchExecutiveOverview } from "../lib/api/executive";

export function useExecutiveOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchExecutiveOverview().then(setData);
  }, []);

  return data;
}
