"use client";

import { PageShell, Card, Table, SectionHeader, Badge } from "@bid/ui";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

const users = [
  { name: "PMU Manager", email: "pmu@municipality.gov", role: "PMU", active: true },
  { name: "SCM Practitioner", email: "scm@municipality.gov", role: "SCM", active: true },
  { name: "Internal Auditor", email: "audit@municipality.gov", role: "Internal Audit", active: true },
  { name: "Viewer", email: "viewer@municipality.gov", role: "Read Only", active: false }
];

export default function UsersSettingsPage() {
  return (
    <PageShell menu={menu} title="Settings - Users">
      <SectionHeader title="Users" description="Manage user accounts and access status." />

      <Card>
        <Table headers={["Name", "Email", "Role", "Status"]}>
          {users.map((u) => (
            <tr key={u.email} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <Badge color={u.active ? "green" : "red"}>
                  {u.active ? "Active" : "Disabled"}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
