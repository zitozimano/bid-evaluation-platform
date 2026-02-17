"use client";

import { useEffect, useState } from "react";
import { KpiCard, ChartCard, SCMWorkflowHeatmap } from "@bidplatform/ui";
import { createApiClient, createAnalyticsApi } from "@bidplatform/api";

const client = createApiClient(
  process.env.NEXT_PUBLIC_API_URL!,
  () => localStorage.getItem("token")
);
const analyticsApi = createAnalyticsApi(client);

export default function AnalyticsOverviewPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    analyticsApi.getOverview().then(setData).catch(console.error);
  }, []);

  if (!data) return <div>Loading analytics…</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <KpiCard label="Bids evaluated" value={data.totalEvaluations} helper="Last 12 months" />
        <KpiCard label="Average turnaround" value={`${data.avgTurnaroundDays} days`} helper="Evaluation cycle" />
        <KpiCard label="Compliance rate" value={`${data.complianceRate}%`} helper="Required items satisfied" />
        <KpiCard label="Exceptions" value={data.exceptionsCount} helper="SCM deviations & overrides" />
      </div>

      <ChartCard
        title="Evaluations per month"
        data={data.evaluationsPerMonth}
      />

      <SCMWorkflowHeatmap stages={data.workflowStages} />
    </div>
  );
}
