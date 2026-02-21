"use client";

import Link from "next/link";
import { PageShell, Card, Table, SectionHeader, StatusChip } from "@bid/ui";
import { useTenders } from "@/hooks/useTenders";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tenders", href: "/tenders" },
  { label: "Evaluations", href: "/evaluations" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" }
];

export default function TendersPage() {
  const tenders = useTenders();
  if (!tenders) return <div className="p-6">Loading...</div>;

  return (
    <PageShell menu={menu} title="Tenders">
      <SectionHeader
        title="Tenders Register"
        description="All active, pending, and completed tenders."
      />

      <Card>
        <Table headers={["Bid No", "Description", "Department", "Closing Date", "Status"]}>
          {tenders.map((t: any) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">
                <Link href={`/tenders/${t.id}`} className="text-blue-600 underline">
                  {t.id}
                </Link>
              </td>
              <td className="p-2">{t.description}</td>
              <td className="p-2">{t.department}</td>
              <td className="p-2">{t.closingDate}</td>
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
