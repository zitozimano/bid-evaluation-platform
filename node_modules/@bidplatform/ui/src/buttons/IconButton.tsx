import React from "react";

export function IconButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`p-2 rounded-md bg-surface-light hover:bg-surface-lighter transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
