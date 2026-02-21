"use client";

import { PageShell, Card, SectionHeader, Button, Table, Input } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";
import { submitFunctionality } from "@/lib/api/evaluations";
import { useState } from "react";

const criteria = [
  { id: "C1", name: "Experience", weight: 30 },
  { id: "C2", name: "Technical Approach", weight: 40 },
  { id: "C3", name: "Capacity & Resources", weight: 30 }
];

export default function FunctionalityPage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  const [saving, setSaving] = useState(false);

  const [scores, setScores] = useState<any>({});

  if (!evaluation) return <div className="p-6">Loading...</div>;

  function updateScore(bidder: string, criterion: string, value: number) {
    setScores((prev: any) => ({
      ...prev,
      [bidder]: {
        ...prev[bidder],
        [criterion]: value
      }
    }));
  }

  async function handleSubmit() {
    setSaving(true);
    await submitFunctionality(params.evaluationId, scores);
    window.location.href = `/evaluations/${params.evaluationId}/price`;
  }

  return (
    <PageShell title="Functionality Scoring">
      <SectionHeader
        title="Functionality"
        description="Score bidders against functionality criteria."
      />

      <Card>
        <Table headers={["Criterion", "Weight", ...evaluation.bidders.map((b: any) => b.name)]}>
          {criteria.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.weight}%</td>

              {evaluation.bidders.map((b: any) => (
                <td key={b.name} className="p-2">
                  <Input
                    type="number"
                    min={0}
                    max={c.weight}
                    onChange={(e) =>
                      updateScore(b.name, c.id, Number(e.target.value))
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </Table>
      </Card>

      <Button onClick={handleSubmit} disabled={saving} className="mt-6">
        Next: Price →
      </Button>
    </PageShell>
  );
}
