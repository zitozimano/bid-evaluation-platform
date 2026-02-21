"use client";

import { PageShell, Card, Table, SectionHeader, StatusChip } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

const evaluations = [
  { id: "EV-001", tenderId: "BID-001", stage: "Functionality", status: "in_progress" },
  { id: "EV-002", tenderId: "BID-002", stage: "Compliance", status: "pending" },
  { id: "EV-003", tenderId: "BID-003", stage: "Price & Preference", status: "approved" }
];

export default function EvaluationsPage() {
  return (
    <PageShell menu={menu} title="Evaluations">
      <SectionHeader
        title="Evaluation Workflow"
        description="Track evaluation stages, status, and progress across all bids."
      />

      <Card>
        <Table headers={["Evaluation ID", "Bid No", "Stage", "Status"]}>
          {evaluations.map((e) => (
            <tr key={e.id} className="border-b">
              <td className="p-2">{e.id}</td>
              <td className="p-2">{e.tenderId}</td>
              <td className="p-2">{e.stage}</td>
              <td className="p-2">
                <StatusChip status={e.status} />
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
