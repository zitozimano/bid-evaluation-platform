"use client";

import { PageShell, Card, SectionHeader, Button, StatusChip } from "@bid/ui";
import { useEvaluation } from "@/hooks/useEvaluation";
import { submitCompliance } from "@/lib/api/evaluations";
import { fetchRequiredDocuments } from "@/lib/api/documents";
import { useEffect, useState } from "react";

export default function CompliancePage({ params }: { params: { evaluationId: string } }) {
  const evaluation = useEvaluation(params.evaluationId);
  const [required, setRequired] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!evaluation) return;
    fetchRequiredDocuments(evaluation.tenderId).then(setRequired);
  }, [evaluation]);

  if (!evaluation || !required) return <div className="p-6">Loading...</div>;

  const canProceed = required.allRequired;

  async function handleSubmit() {
    if (!canProceed) return;
    setSaving(true);
    await submitCompliance(params.evaluationId, { ok: true });
    window.location.href = `/evaluations/${params.evaluationId}/functionality`;
  }

  return (
    <PageShell title="Compliance Check">
      <SectionHeader
        title="Compliance Evaluation"
        description="Verify mandatory documents before proceeding."
      />

      <Card>
        <h3 className="font-semibold mb-4">Required Documents</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Terms of Reference (TOR)</span>
            <StatusChip status={required.hasTOR ? "approved" : "pending"} />
          </div>

          <div className="flex justify-between">
            <span>Specification Document (SPEC)</span>
            <StatusChip status={required.hasSpec ? "approved" : "pending"} />
          </div>
        </div>

        {!canProceed && (
          <p className="text-red-600 mt-4">
            You cannot proceed until all required documents are uploaded.
          </p>
        )}
      </Card>

      <Button
        onClick={handleSubmit}
        disabled={!canProceed || saving}
        className="mt-6"
      >
        {canProceed ? "Next: Functionality →" : "Missing Required Documents"}
      </Button>
    </PageShell>
  );
}
