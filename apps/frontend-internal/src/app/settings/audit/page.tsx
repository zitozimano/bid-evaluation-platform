"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function AuditSettingsPage() {
  return (
    <PageShell menu={menu} title="Settings - Audit">
      <SectionHeader
        title="Audit & Logging"
        description="Configure audit trails, retention, and access to logs."
      />

      <div className="grid grid-cols-2 gap-6">
        <Card>Audit Log Retention: 5 years</Card>
        <Card>Access: Internal Audit, External Audit, Treasury</Card>
      </div>
    </PageShell>
  );
}
