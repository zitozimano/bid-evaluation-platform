import React from "react";

export const Table = ({
  headers,
  children
}: {
  headers: string[];
  children: React.ReactNode;
}) => (
  <table className="w-full border-collapse">
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h} className="border-b p-2 text-left font-semibold">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
