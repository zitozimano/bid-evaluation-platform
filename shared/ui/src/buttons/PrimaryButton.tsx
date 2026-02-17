import React from "react";

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-brand text-surface font-medium hover:bg-brand-light transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
