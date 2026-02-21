"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";

export default function SummaryPage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  if (!evaluation) return <div className="p-6">Loading...</div>;

  return (
    <PageShell title="Evaluation Summary">
      <SectionHeader
        title="Evaluation Summary"
        description="Final summary of all evaluation stages."
      />

      <Card>
        <p>Evaluation ID: {evaluation.id}</p>
        <p>Tender ID: {evaluation.tenderId}</p>
      </Card>

      <Card className="mt-6">
        <h3 className="font-semibold mb-2">Bidders</h3>
        <ul className="list-disc list-inside">
          {evaluation.bidders.map((b: any) => (
            <li key={b.name}>{b.name}</li>
          ))}
        </ul>
      </Card>
    </PageShell>
  );
}
