"use client";

import Link from "next/link";
import { PageShell, Card, SectionHeader, StatusChip, Table } from "@bid/ui";
import { usePMUOverview } from "@/hooks/usePMUOverview";
import { FilterBar } from "@/components/FilterBar";
import { useState } from "react";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function PMUDashboardPage() {
  const data = usePMUOverview();
  const [filters, setFilters] = useState<{ period?: string; status?: string }>({});

  if (!data) return <div className="p-6">Loading...</div>;

  const filteredProjects = data.projects.filter((p: any) =>
    filters.status ? p.status === filters.status : true
  );

  return (
    <PageShell menu={menu} title="PMU Dashboard">
      <SectionHeader
        title="Project Pipeline & Delivery"
        description="Track project lifecycle, milestones, and delivery risk."
      />

      <FilterBar onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>Total Active Projects: {data.totalProjects}</Card>
        <Card>Projects at Risk: {data.atRisk}</Card>
        <Card>Annual Capital Budget: R {data.capitalBudget.toLocaleString()}</Card>
      </div>

      <Card>
        <Table headers={["Project", "Stage", "Status", "Budget", "Spent"]}>
          {filteredProjects.map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">
                <Link href={`/dashboard/pmu/${p.id}`} className="text-blue-600 underline">
                  {p.name}
                </Link>
              </td>
              <td className="p-2">{p.stage}</td>
              <td className="p-2">
                <StatusChip status={p.status} />
              </td>
              <td className="p-2">R {p.budget.toLocaleString()}</td>
              <td className="p-2">R {p.spent.toLocaleString()}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
