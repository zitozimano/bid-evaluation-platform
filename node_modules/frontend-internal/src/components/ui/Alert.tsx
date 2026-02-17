import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
};

export function Alert({ title, children, variant = "info" }: Props) {
  const base = "rounded-md border px-3 py-2 text-sm";
  const variants: Record<string, string> = {
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-100",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-100",
    warning:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-100",
    danger:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-100",
  };

  return (
    <div className={`${base} ${variants[variant]}`}>
      {title && <div className="mb-1 font-semibold">{title}</div>}
      {children}
    </div>
  );
}
