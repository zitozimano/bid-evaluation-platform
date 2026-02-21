"use client";

import { PageShell, Card, SectionHeader, StatusChip, Table } from "@bid/ui";
import { useSCMOverview } from "@/hooks/useSCMOverview";
import { FilterBar } from "@/components/FilterBar";
import { useState } from "react";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function SCMDashboardPage() {
  const data = useSCMOverview();
  const [filters, setFilters] = useState<{ status?: string }>({});

  if (!data) return <div className="p-6">Loading...</div>;

  const filtered = data.tenders.filter((t: any) =>
    filters.status ? t.status === filters.status : true
  );

  return (
    <PageShell menu={menu} title="SCM Dashboard">
      <SectionHeader
        title="Procurement & Compliance"
        description="Monitor tenders, evaluations, and SCM process health."
      />

      <FilterBar onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>Active Tenders: {data.activeTenders}</Card>
        <Card>Evaluations in Progress: {data.evaluationsInProgress}</Card>
        <Card>Compliance Flags: {data.complianceFlags}</Card>
      </div>

      <Card>
        <Table headers={["Bid No", "Description", "Stage", "Status"]}>
          {filtered.map((t: any) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">{t.id}</td>
              <td className="p-2">{t.description}</td>
              <td className="p-2">{t.stage}</td>
              <td className="p-2">
                <StatusChip status={t.status} />
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
