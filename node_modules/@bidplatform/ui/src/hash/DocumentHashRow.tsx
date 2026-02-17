import React from "react";

export type DocumentHash = {
  id: string;
  name: string;
  hash: string;
  verified: boolean | null;
};

export function DocumentHashRow({ doc }: { doc: DocumentHash }) {
  return (
    <tr className="border-b border-surface-lighter text-sm">
      <td className="px-3 py-2 text-text">{doc.name}</td>
      <td className="px-3 py-2 text-[11px] text-text-muted break-all">
        {doc.hash}
      </td>
      <td className="px-3 py-2 text-xs">
        {doc.verified === null && (
          <span className="text-text-muted">Not checked</span>
        )}
        {doc.verified === true && (
          <span className="text-brand">Verified</span>
        )}
        {doc.verified === false && (
          <span className="text-red-400">Mismatch</span>
        )}
      </td>
    </tr>
  );
}
