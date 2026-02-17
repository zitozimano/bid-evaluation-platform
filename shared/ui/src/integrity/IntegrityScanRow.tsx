import React from "react";

export type IntegrityScanResult = {
  id: string;
  filename: string;
  hash: string;
  tampered: boolean;
};

export function IntegrityScanRow({ item }: { item: IntegrityScanResult }) {
  return (
    <tr className="border-b border-surface-lighter text-sm">
      <td className="px-3 py-2 text-text">{item.filename}</td>
      <td className="px-3 py-2 text-[11px] text-text-muted break-all">
        {item.hash}
      </td>
      <td className="px-3 py-2">
        {item.tampered ? (
          <span className="text-red-400">Tampered</span>
        ) : (
          <span className="text-brand">Clean</span>
        )}
      </td>
    </tr>
  );
}
