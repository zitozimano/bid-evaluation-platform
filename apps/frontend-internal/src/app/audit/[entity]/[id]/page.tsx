"use client";

import { PageShell, Card, SectionHeader, Table } from "@bid/ui";
import { useEffect, useState } from "react";

export default function AuditPage({ params }: { params: { entity: string; id: string } }) {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/audit/${params.entity}/${params.id}`)
      .then((r) => r.json())
      .then(setLogs);
  }, []);

  return (
    <PageShell title="Audit Trail">
      <SectionHeader
        title="Audit Trail"
        description="All actions performed on this entity."
      />

      <Card>
        <Table headers={["Timestamp", "Action", "Old State", "New State", "Payload"]}>
          {logs.map((l, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{l.timestamp}</td>
              <td className="p-2">{l.action}</td>
              <td className="p-2">{l.oldState || "-"}</td>
              <td className="p-2">{l.newState || "-"}</td>
              <td className="p-2 text-xs">{JSON.stringify(l.payload)}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </PageShell>
  );
}
