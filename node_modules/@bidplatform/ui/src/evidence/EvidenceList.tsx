import React from "react";
import type { EvidenceItemProps } from "./EvidenceItem";

export function EvidenceList({ items }: { items: EvidenceItemProps[] }) {
  if (!items.length) {
    return <p className="text-text-muted text-sm">No evidence captured.</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <EvidenceItem key={item.id} {...item} />
      ))}
    </div>
  );
}
