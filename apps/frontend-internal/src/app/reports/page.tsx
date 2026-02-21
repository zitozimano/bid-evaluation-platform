"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function ReportsPage() {
  return (
    <PageShell menu={menu} title="Reports">
      <SectionHeader
        title="Reports Dashboard"
        description="High-level reporting views for Council, Audit, Treasury, and Executive."
      />

      <div className="grid grid-cols-3 gap-6">
        <Card>Monthly Reports (12)</Card>
        <Card>Quarterly Reports (4)</Card>
        <Card>Annual Reports (1)</Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card>Value for Money Analysis</Card>
        <Card>Irregular / Fruitless & Wasteful Spend Flags</Card>
      </div>
    </PageShell>
  );
}
