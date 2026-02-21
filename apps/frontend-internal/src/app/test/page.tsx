"use client";

import { Button, Card, SectionHeader, StatusChip } from "@bid/ui";

export default function TestPage() {
  return (
    <div className="p-6 space-y-6">
      <SectionHeader title="UI Test Page" description="Verifying @bid/ui components" />

      <Card>
        <h3 className="text-lg font-semibold mb-4">Buttons</h3>
        <div className="flex gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Status Chips</h3>
        <div className="flex gap-4">
          <StatusChip status="pending" />
          <StatusChip status="approved" />
          <StatusChip status="rejected" />
          <StatusChip status="in_progress" />
        </div>
      </Card>
    </div>
  );
}
