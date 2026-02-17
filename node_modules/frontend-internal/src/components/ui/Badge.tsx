import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
};

export function Badge({ children, variant = "default" }: Props) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const variants: Record<string, string> = {
    default:
      "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-50",
    success:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-50",
    warning:
      "bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-50",
    danger: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-50",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
