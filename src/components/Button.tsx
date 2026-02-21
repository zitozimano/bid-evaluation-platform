import React from "react";
import { colors } from "../theme/colors";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof colors;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition ${colors[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
