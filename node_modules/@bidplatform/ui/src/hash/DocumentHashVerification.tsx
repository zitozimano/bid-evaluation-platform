import React from "react";
import { DocumentHashRow, DocumentHash } from "./DocumentHashRow";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function DocumentHashVerification({
  documents,
  onVerify
}: {
  documents: DocumentHash[];
  onVerify: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">Document Hash Verification</h3>
        <PrimaryButton type="button" onClick={onVerify}>
          Run verification
        </PrimaryButton>
      </div>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-surface-lighter text-xs text-text">
            <tr>
              <th className="px-3 py-2 text-left">Document</th>
              <th className="px-3 py-2 text-left">Hash</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <DocumentHashRow key={d.id} doc={d} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
