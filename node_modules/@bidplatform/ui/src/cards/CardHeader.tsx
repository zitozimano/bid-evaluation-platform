import React from "react";

export function CardHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold text-text mb-2">
      {title}
    </h2>
  );
}
