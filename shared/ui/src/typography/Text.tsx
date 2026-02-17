import React from "react";

export function Text({
  children,
  size = "base",
  className = ""
}: {
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "lg";
  className?: string;
}) {
  return (
    <p className={`text-${size} text-text-muted ${className}`}>
      {children}
    </p>
  );
}
