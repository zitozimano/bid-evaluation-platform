import React from "react";

export function SecondaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-surface-light text-text-muted border border-surface-lighter hover:bg-surface-lighter transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
