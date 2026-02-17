import React from "react";

export type EvidenceItemProps = {
  id: string;
  label: string;
  type: "document" | "image" | "link" | "other";
  url?: string;
  hash?: string;
};

export function EvidenceItem({ label, type, url, hash }: EvidenceItemProps) {
  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-3 text-sm">
      <div className="flex justify-between">
        <span className="font-medium text-text">{label}</span>
        <span className="text-text-muted uppercase text-xs">{type}</span>
      </div>
      {url && (
        <a
          href={url}
          className="text-brand text-xs mt-1 inline-block hover:text-brand-light"
          target="_blank"
          rel="noreferrer"
        >
          Open evidence
        </a>
      )}
      {hash && (
        <div className="mt-1 text-[11px] text-text-muted break-all">
          <span className="font-semibold">Hash:</span> {hash}
        </div>
      )}
    </div>
  );
}
