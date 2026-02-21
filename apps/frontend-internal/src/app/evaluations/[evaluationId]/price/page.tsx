"use client";

import { PageShell, Card, SectionHeader, Button, Table, Input } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";
import { submitPrice } from "@/lib/api/evaluations";
import { useState } from "react";

export default function PricePage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  const [saving, setSaving] = useState(false);
  const [prices, setPrices] = useState<any>({});

  if (!evaluation) return <div className="p-6">Loading...</div>;

  function updatePrice(bidder: string, value: number) {
    setPrices((prev: any) => ({
      ...prev,
      [bidder]: value
    }));
  }

  const lowest = Math.min(...Object.values(prices).filter((v) => v > 0));

  async function handleSubmit() {
    setSaving(true);
    await submitPrice(params.evaluationId, prices);
    window.location.href = `/evaluations/${params.evaluationId}/preference`;
  }

  return (
    <PageShell title="Price Evaluation">
      <SectionHeader
        title="Price"
        description="Evaluate bidder pricing and calculate comparative scores."
      />

      <Card>
        <Table headers={["Bidder", "Price (R)", "Score (80)"]}>
          {evaluation.bidders.map((b: any) => {
            const price = prices[b.name] || 0;
            const score = lowest ? (lowest / price) * 80 : 0;

            return (
              <tr key={b.name} className="border-b">
                <td className="p-2">{b.name}</td>
                <td className="p-2">
                  <Input
                    type="number"
                    min={1}
                    onChange={(e) => updatePrice(b.name, Number(e.target.value))}
                  />
                </td>
                <td className="p-2">{score.toFixed(2)}</td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Button onClick={handleSubmit} disabled={saving} className="mt-6">
        Next: Preference →
      </Button>
    </PageShell>
  );
}
