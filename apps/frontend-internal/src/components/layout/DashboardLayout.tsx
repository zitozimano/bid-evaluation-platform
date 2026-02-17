import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function DashboardLayout({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="text-xs text-slate-500">
            Bid Evaluation Platform – Internal
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-6">{children}</main>
    </div>
  );
}
