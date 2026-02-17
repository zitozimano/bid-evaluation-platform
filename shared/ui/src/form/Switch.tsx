import React from "react";

export function Switch({
  checked,
  onChange,
  className = ""
}: {
  checked: boolean;
  onChange: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-5 flex items-center rounded-full transition ${
        checked ? "bg-brand" : "bg-surface-lighter"
      } ${className}`}
    >
      <div
        className={`w-4 h-4 bg-surface rounded-full transform transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
