"use client";

import { PageShell, Card, Table, SectionHeader } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

const roles = [
  { name: "PMU", permissions: "Create & manage projects, view reports" },
  { name: "SCM", permissions: "Manage tenders, evaluations, compliance" },
  { name: "Internal Audit", permissions: "View all, audit logs, reports" },
  { name: "Executive", permissions: "View dashboards & key reports" }
];

export default function RolesSettingsPage() {
  return (
    <PageShell menu={menu} title="Settings - Roles">
      <SectionHeader title="Roles & Permissions" description="Role definitions and high-level permissions." />

      <Card>
        <Table headers={["Role", "Permissions"]}>
          {roles.map((r) => (
            <tr key={r.name} className="border-b">
              <td className="p-2 font-semibold">{r.name}</td>
              <td className="p-2">{r.permissions}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
