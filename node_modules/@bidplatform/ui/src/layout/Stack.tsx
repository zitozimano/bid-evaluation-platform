import React from "react";

export function Stack({
  children,
  gap = 4,
  className = ""
}: {
  children: React.ReactNode;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-${gap} ${className}`}>
      {children}
    </div>
  );
}
