"use client";

import { useEffect, useState } from "react";
import { fetchEvaluation } from "../lib/api/evaluations";

export function useEvaluation(id: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchEvaluation(id).then(setData);
  }, [id]);

  return data;
}
