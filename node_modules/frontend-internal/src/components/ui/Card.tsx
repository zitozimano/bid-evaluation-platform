import { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export function Card({ title, subtitle, children }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
