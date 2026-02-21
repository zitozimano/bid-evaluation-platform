"use client";

import { PageShell, Card, SectionHeader, StatusChip } from "@bid/ui";
import { usePMUOverview } from "@/hooks/usePMUOverview";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function PMUProjectDetailPage({
  params
}: {
  params: { projectId: string };
}) {
  const data = usePMUOverview();
  if (!data) return <div className="p-6">Loading...</div>;

  const project = data.projects.find((p: any) => p.id === params.projectId);
  if (!project) return <div className="p-6">Project not found.</div>;

  return (
    <PageShell menu={menu} title={`Project: ${project.name}`}>
      <SectionHeader
        title={project.name}
        description="Project details aligned to PMU delivery and evaluation context."
      />

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-2">Stage & Status</h3>
          <p>Stage: {project.stage}</p>
          <p>
            Status: <StatusChip status={project.status} />
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">Financials</h3>
          <p>Budget: R {project.budget.toLocaleString()}</p>
          <p>Spent: R {project.spent.toLocaleString()}</p>
        </Card>
      </div>
    </PageShell>
  );
}
