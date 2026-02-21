"use client";

import { Select } from "@bid/ui";

type Props = {
  onChange: (filters: { period?: string; status?: string }) => void;
};

export function FilterBar({ onChange }: Props) {
  return (
    <div className="flex gap-4 mb-6">
      <Select onChange={(e) => onChange({ period: e.target.value })}>
        <option value="fy">Financial Year</option>
        <option value="q1">Q1</option>
        <option value="q2">Q2</option>
        <option value="q3">Q3</option>
        <option value="q4">Q4</option>
      </Select>

      <Select onChange={(e) => onChange({ status: e.target.value })}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="approved">Approved</option>
      </Select>
    </div>
  );
}
