import { ReactNode } from "react";

type TabsProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

type TabProps = {
  value: string;
  label: string;
};

export function Tabs({ value, onChange, children }: TabsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700">
        {children &&
          (children as any[]).map((child) => {
            if (!child) return null;
            const props = child.props as TabProps;
            const active = props.value === value;
            return (
              <button
                key={props.value}
                onClick={() => onChange(props.value)}
                className={`rounded-t-md px-3 py-1.5 text-xs font-medium ${
                  active
                    ? "border border-b-transparent border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {props.label}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export function Tab(_props: TabProps) {
  return null;
}
