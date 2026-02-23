import React from "react";

export const Card = ({
  className = "",
  children
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white shadow-sm border rounded-lg p-4 ${className}`}>
    {children}
  </div>
);
