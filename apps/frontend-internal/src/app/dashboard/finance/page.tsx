"use client";

import { PageShell, Card, SectionHeader, Table } from "@bid/ui";
import { useFinanceOverview } from "@/hooks/useFinanceOverview";
import { FilterBar } from "@/components/FilterBar";
import { useState } from "react";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function FinanceDashboardPage() {
  const data = useFinanceOverview();
  const [filters, setFilters] = useState<{ period?: string }>({});

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <PageShell menu={menu} title="Finance Dashboard">
      <SectionHeader
        title="Budget, Commitments & Spend"
        description="Track capital budget, commitments, and payments across key votes."
      />

      <FilterBar onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>Total Capital Budget: R {data.totalBudget.toLocaleString()}</Card>
        <Card>Total Committed: R {data.totalCommitted.toLocaleString()}</Card>
        <Card>Total Spent: R {data.totalSpent.toLocaleString()}</Card>
      </div>

      <Card>
        <Table headers={["Vote", "Budget", "Committed", "Spent"]}>
          {data.lines.map((l: any) => (
            <tr key={l.vote} className="border-b">
              <td className="p-2">{l.vote}</td>
              <td className="p-2">R {l.budget.toLocaleString()}</td>
              <td className="p-2">R {l.committed.toLocaleString()}</td>
              <td className="p-2">R {l.spent.toLocaleString()}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
