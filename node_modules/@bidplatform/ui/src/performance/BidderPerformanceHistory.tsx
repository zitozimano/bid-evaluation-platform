import React from "react";

export type PerformancePoint = {
  period: string; // e.g. "2022/23", "Q1 2024"
  score: number;  // 0–100
};

export type BidderPerformanceHistoryProps = {
  bidder: string;
  history: PerformancePoint[];
};

export function BidderPerformanceHistory({ bidder, history }: BidderPerformanceHistoryProps) {
  const max = Math.max(...history.map((h) => h.score), 100);
  const min = Math.min(...history.map((h) => h.score), 0);
  const range = max - min || 1;

  return (
    <div className="rounded-md border border-surface-lighter bg-surface-light p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-text font-semibold text-sm">Performance history</h3>
        <span className="text-xs text-text-muted">{bidder}</span>
      </div>

      <div className="w-full h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {history.length > 1 && (
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              points={history
                .map((p, i) => {
                  const x = (i / (history.length - 1)) * 100;
                  const y = 100 - ((p.score - min) / range) * 100;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          )}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-text-muted">
        {history.map((p) => (
          <div key={p.period} className="flex items-center gap-1">
            <span className="font-medium text-text">{p.period}:</span>
            <span>{p.score}/100</span>
          </div>
        ))}
      </div>
    </div>
  );
}
