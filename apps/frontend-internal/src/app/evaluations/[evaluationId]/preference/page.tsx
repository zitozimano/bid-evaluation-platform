"use client";

import { PageShell, Card, SectionHeader, Button, Table, Select } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";
import { submitPreference } from "@/lib/api/evaluations";
import { useState } from "react";

const bbbeePoints: any = {
  "Level 1": 20,
  "Level 2": 18,
  "Level 3": 14,
  "Level 4": 12,
  "Level 5": 8,
  "Level 6": 6,
  "Level 7": 4,
  "Level 8": 2,
  "Non-compliant": 0
};

export default function PreferencePage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  const [saving, setSaving] = useState(false);
  const [levels, setLevels] = useState<any>({});

  if (!evaluation) return <div className="p-6">Loading...</div>;

  function updateLevel(bidder: string, level: string) {
    setLevels((prev: any) => ({
      ...prev,
      [bidder]: level
    }));
  }

  async function handleSubmit() {
    setSaving(true);
    await submitPreference(params.evaluationId, levels);
    window.location.href = `/evaluations/${params.evaluationId}/recommendation`;
  }

  return (
    <PageShell title="Preference Points">
      <SectionHeader
        title="Preference"
        description="Apply preference points (BBBEE, local content, etc.)."
      />

      <Card>
        <Table headers={["Bidder", "BBBEE Level", "Points (20)"]}>
          {evaluation.bidders.map((b: any) => {
            const level = levels[b.name] || "Level 4";
            const points = bbbeePoints[level];

            return (
              <tr key={b.name} className="border-b">
                <td className="p-2">{b.name}</td>
                <td className="p-2">
                  <Select onChange={(e) => updateLevel(b.name, e.target.value)}>
                    {Object.keys(bbbeePoints).map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="p-2">{points}</td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Button onClick={handleSubmit} disabled={saving} className="mt-6">
        Next: Recommendation →
      </Button>
    </PageShell>
  );
}
