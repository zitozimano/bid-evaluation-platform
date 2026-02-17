import React from "react";
import { Input } from "../form/Input";
import { Textarea } from "../form/Textarea";

export type AnnexureItem = {
  id: string;
  title: string;
  description: string;
};

export function AnnexureItemEditor({
  item,
  onChange,
  onRemove
}: {
  item: AnnexureItem;
  onChange: (item: AnnexureItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-3 space-y-2">
      <Input
        label="Title"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
      />
      <Textarea
        label="Description"
        value={item.description}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
      />
      <button
        type="button"
        className="text-xs text-red-400 hover:text-red-300"
        onClick={onRemove}
      >
        Remove annexure
      </button>
    </div>
  );
}
