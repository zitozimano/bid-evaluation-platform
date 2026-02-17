// shared/ui/src/table/TableHeader.tsx
import React from "react";

export const TableHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-50">
    <tr>{children}</tr>
  </thead>
);
