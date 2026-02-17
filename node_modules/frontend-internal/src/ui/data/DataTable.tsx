import React from 'react';

type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string;
};

export function DataTable<T>({ columns, data, getRowKey }: Props<T>) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} className="text-left border-b border-gray-200 pb-2">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={getRowKey(row)} className="hover:bg-gray-50">
            {columns.map((c) => (
              <td key={c.key} className="py-1.5 pr-4">
                {c.render ? c.render(row) : (row as any)[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
