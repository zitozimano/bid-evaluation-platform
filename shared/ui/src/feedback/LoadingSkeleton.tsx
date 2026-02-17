export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
      <div className="h-3 w-full bg-slate-700 rounded"></div>
      <div className="h-3 w-2/3 bg-slate-700 rounded"></div>
    </div>
  );
}
