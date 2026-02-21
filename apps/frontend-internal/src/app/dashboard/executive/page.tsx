"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";
import { useExecutiveOverview } from "@/hooks/useExecutiveOverview";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function ExecutiveDashboardPage() {
  const data = useExecutiveOverview();
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <PageShell menu={menu} title="Executive Dashboard">
      <SectionHeader
        title="Strategic Oversight"
        description="High-level KPIs, exceptions, and value-for-money signals."
      />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>Capital Budget Execution: {(data.capexExecution * 100).toFixed(0)}%</Card>
        <Card>Projects On Track: {(data.projectsOnTrack * 100).toFixed(0)}%</Card>
        <Card>High-Risk Projects: {data.highRiskProjects}</Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-2">Top Exceptions</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {data.exceptions.map((e: string, idx: number) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </Card>
    </PageShell>
  );
}
