// src/pages/EvaluationPackPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EvaluationPackViewer from "../components/EvaluationPackViewer/EvaluationPackViewer";

export default function EvaluationPackPage() {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [pack, setPack] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenderId) return;

    fetch(`/evidence/tender/${tenderId}/pack`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setPack(data.pack);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tenderId]);

  if (!tenderId) return <div>Missing tenderId in route.</div>;
  if (loading) return <div>Loading evaluation pack…</div>;
  if (!pack) return <div>No evaluation pack available.</div>;

  return <EvaluationPackViewer pack={pack} />;
}
