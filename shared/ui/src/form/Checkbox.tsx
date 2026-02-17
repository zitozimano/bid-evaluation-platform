import React from "react";

export function Checkbox({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={`w-4 h-4 rounded bg-surface-light border border-surface-lighter text-brand focus:ring-brand ${className}`}
        {...props}
      />
      {label && <span className="text-text-muted">{label}</span>}
    </label>
  );
}
