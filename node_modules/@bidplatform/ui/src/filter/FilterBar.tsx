import React from "react";
import { Input } from "../form/Input";
import { Select } from "../form/Select";

export function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange
}: {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="w-64">
        <Input
          label="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-48">
        <Select
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </Select>
      </div>
    </div>
  );
}
