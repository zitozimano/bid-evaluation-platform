"use client";

import { PageShell, Card, SectionHeader } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function SettingsPage() {
  return (
    <PageShell menu={menu} title="Settings">
      <SectionHeader
        title="System Settings"
        description="Manage users, roles, permissions, and audit configuration."
      />

      <div className="grid grid-cols-3 gap-6">
        <Card>Users & Access</Card>
        <Card>Roles & Permissions</Card>
        <Card>Audit & Logging</Card>
      </div>
    </PageShell>
  );
}
