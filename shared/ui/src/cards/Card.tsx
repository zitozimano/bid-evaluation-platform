import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg bg-surface-light shadow-card p-4 ${className}`}>
      {children}
    </div>
  );
}
