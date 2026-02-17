import React from "react";

export function Heading({
  children,
  level = 2,
  className = ""
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`font-semibold text-text ${className}`}>
      {children}
    </Tag>
  );
}
