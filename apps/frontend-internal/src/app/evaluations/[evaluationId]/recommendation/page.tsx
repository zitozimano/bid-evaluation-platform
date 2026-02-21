"use client";

import { PageShell, Card, SectionHeader, Button } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";
import { submitRecommendation } from "@/lib/api/evaluations";
import { useState } from "react";

export default function RecommendationPage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  const [saving, setSaving] = useState(false);

  if (!evaluation) return <div className="p-6">Loading...</div>;

  // Fake totals for now — backend integration will replace this
  const totals = evaluation.bidders.map((b: any) => ({
    name: b.name,
    total: Math.random() * 100 // placeholder
  }));

  const recommended = totals.sort((a: any, b: any) => b.total - a.total)[0];

  async function handleSubmit() {
    setSaving(true);
    await submitRecommendation(params.evaluationId, { recommended });
    window.location.href = `/evaluations/${params.evaluationId}/summary`;
  }

  return (
    <PageShell title="Recommendation">
      <SectionHeader
        title="Final Recommendation"
        description="Review total scores and confirm the recommended bidder."
      />

      <Card>
        <h3 className="font-semibold mb-2">Recommended Bidder</h3>
        <p>{recommended.name}</p>
        <p>Total Score: {recommended.total.toFixed(2)}</p>
      </Card>

      <Button onClick={handleSubmit} disabled={saving} className="mt-6">
        Finalise Evaluation →
      </Button>
    </PageShell>
  );
}
