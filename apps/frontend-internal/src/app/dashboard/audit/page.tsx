"use client";

import { PageShell, Card, SectionHeader, StatusChip, Table } from "@bid/ui";
import { useAuditOverview } from "@/hooks/useAuditOverview";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function AuditDashboardPage() {
  const data = useAuditOverview();
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <PageShell menu={menu} title="Internal Audit Dashboard">
      <SectionHeader
        title="Findings & Follow-ups"
        description="Monitor audit findings, severity, and follow-up status."
      />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>Open Findings: {data.openFindings}</Card>
        <Card>High Severity: {data.highSeverity}</Card>
        <Card>Overdue Follow-ups: {data.overdue}</Card>
      </div>

      <Card>
        <Table headers={["Finding ID", "Area", "Severity", "Status"]}>
          {data.findings.map((f: any) => (
            <tr key={f.id} className="border-b">
              <td className="p-2">{f.id}</td>
              <td className="p-2">{f.area}</td>
              <td className="p-2">{f.severity}</td>
              <td className="p-2">
                <StatusChip status={f.status} />
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
