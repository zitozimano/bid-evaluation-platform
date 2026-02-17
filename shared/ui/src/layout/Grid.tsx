import React from "react";

export function Grid({
  children,
  cols = 2,
  gap = 4,
  className = ""
}: {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-${cols} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}
