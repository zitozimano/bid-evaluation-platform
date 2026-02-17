import React, { useMemo } from "react";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export function AdvancedTable<T>({
  data,
  columns,
  sortKey,
  sortDirection,
  onSortChange
}: {
  data: T[];
  columns: Column<T>[];
  sortKey?: keyof T;
  sortDirection?: "asc" | "desc";
  onSortChange?: (key: keyof T) => void;
}) {
  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (sortDirection === "desc") return av > bv ? -1 : 1;
      return av > bv ? 1 : -1;
    });
  }, [data, sortKey, sortDirection]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={String(col.key)}
              header
            >
              <button
                className={`flex items-center gap-1 ${
                  col.sortable ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => col.sortable && onSortChange?.(col.key)}
              >
                <span>{col.label}</span>
                {col.sortable && sortKey === col.key && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </button>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <tbody>
        {sorted.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {col.render ? col.render(row) : String(row[col.key] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
