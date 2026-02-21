import React from "react";

export const Badge = ({
  children,
  color = "gray"
}: {
  children: React.ReactNode;
  color?: "gray" | "blue" | "green" | "red" | "yellow";
}) => {
  const styles = {
    gray: "bg-gray-200 text-gray-800",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700"
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[color]}`}>
      {children}
    </span>
  );
};
