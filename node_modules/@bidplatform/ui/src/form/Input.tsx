import React from "react";

export function Input({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-text-muted">{label}</label>}
      <input
        className={`px-3 py-2 rounded-md bg-surface-light border border-surface-lighter text-text focus:outline-none focus:ring-2 focus:ring-brand ${className}`}
        {...props}
      />
    </div>
  );
}
