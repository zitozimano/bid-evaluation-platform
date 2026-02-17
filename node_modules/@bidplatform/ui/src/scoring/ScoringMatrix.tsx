import React from "react";

export type Criterion = {
  id: string;
  label: string;
  weight: number;
};

export type BidScore = {
  bidder: string;
  scores: { criterionId: string; score: number }[];
  total: number;
};

export function ScoringMatrix({
  criteria,
  bids
}: {
  criteria: Criterion[];
  bids: BidScore[];
}) {
  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse text-sm text-text-muted">
        <thead className="bg-surface-lighter">
          <tr>
            <th className="px-3 py-2 text-left text-text">Bidder</th>
            {criteria.map((c) => (
              <th key={c.id} className="px-3 py-2 text-left text-text">
                {c.label}{" "}
                <span className="text-xs text-text-muted">({c.weight}%)</span>
              </th>
            ))}
            <th className="px-3 py-2 text-left text-text">Total</th>
          </tr>
        </thead>

        <tbody>
          {bids.map((b) => (
            <tr key={b.bidder} className="border-b border-surface-lighter">
              <td className="px-3 py-2 text-text">{b.bidder}</td>

              {criteria.map((c) => {
                const s = b.scores.find((x) => x.criterionId === c.id)?.score ?? 0;
                return (
                  <td key={c.id} className="px-3 py-2">
                    {s}
                  </td>
                );
              })}

              <td className="px-3 py-2 font-semibold text-text">{b.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
