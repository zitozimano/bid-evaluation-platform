"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function DashboardPage() {
  return (
    <PageShell menu={menu} title="Internal Dashboard">
      <SectionHeader
        title="Operational Dashboards"
        description="High-level views for PMU, SCM, Finance, Internal Audit, and Executive leadership."
      />

      {/* Top row: PMU, SCM, Finance */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">PMU Dashboard</h3>
          <p className="text-sm text-gray-600">
            Project pipeline, milestones, cashflow, and lifecycle tracking.
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">SCM Dashboard</h3>
          <p className="text-sm text-gray-600">
            Tenders, evaluations, compliance, and procurement workflow insights.
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Finance Dashboard</h3>
          <p className="text-sm text-gray-600">
            Commitments, payments, budget vs actuals, and value-for-money analysis.
          </p>
        </Card>
      </div>

      {/* Second row: Internal Audit, Executive */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Internal Audit Dashboard</h3>
          <p className="text-sm text-gray-600">
            Findings, follow-ups, risk flags, and audit trail monitoring.
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-2">Executive Dashboard</h3>
          <p className="text-sm text-gray-600">
            High-level KPIs, exceptions, and strategic oversight indicators.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
