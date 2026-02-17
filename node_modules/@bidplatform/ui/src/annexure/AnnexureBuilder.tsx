import React from "react";
import { AnnexureItem, AnnexureItemEditor } from "./AnnexureItemEditor";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function AnnexureBuilder({
  items,
  onChange
}: {
  items: AnnexureItem[];
  onChange: (items: AnnexureItem[]) => void;
}) {
  const addItem = () => {
    onChange([
      ...items,
      { id: crypto.randomUUID(), title: "", description: "" }
    ]);
  };

  const updateItem = (id: string, item: AnnexureItem) => {
    onChange(items.map((x) => (x.id === id ? item : x)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">Annexures</h3>
        <PrimaryButton type="button" onClick={addItem}>
          Add annexure
        </PrimaryButton>
      </div>
      {items.length === 0 && (
        <p className="text-xs text-text-muted">No annexures defined.</p>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <AnnexureItemEditor
            key={item.id}
            item={item}
            onChange={(updated) => updateItem(item.id, updated)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
