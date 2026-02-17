"use client";

import { useEffect, useState } from "react";

interface ScoreRow {
  criterionId: string;
  criterionName: string;
  weight: number;
  score: number;
}

interface BreakdownResponse {
  tenderId: string;
  bidderId: string;
  bidderName: string;
  totalScore: number;
  scores: ScoreRow[];
}

interface Props {
  tenderId: string;
  bidderId: string | null;
  open: boolean;
  onClose: () => void;
}

async function fetchBreakdown(
  tenderId: string,
  bidderId: string,
): Promise<BreakdownResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${tenderId}/bidders/${bidderId}/scoring`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load scoring breakdown");
  return res.json();
}

export function BidderScoringDrawer({
  tenderId,
  bidderId,
  open,
  onClose,
}: Props) {
  const [data, setData] = useState<BreakdownResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !bidderId) return;
    setLoading(true);
    fetchBreakdown(tenderId, bidderId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [open, bidderId, tenderId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />
      <div className="w-full max-w-md bg-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Scoring Breakdown
          </h2>
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Close
          </button>
        </div>

        {loading || !data ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : (
          <>
            <div className="mb-3 text-sm">
              <div className="font-semibold">{data.bidderName}</div>
              <div className="text-xs text-slate-500">
                Total Score: {data.totalScore}
              </div>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-100">
                  <th className="px-2 py-1 text-left">Criterion</th>
                  <th className="px-2 py-1 text-right">Weight</th>
                  <th className="px-2 py-1 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.scores.map((s) => (
                  <tr key={s.criterionId} className="border-b">
                    <td className="px-2 py-1">{s.criterionName}</td>
                    <td className="px-2 py-1 text-right">
                      {s.weight}
                    </td>
                    <td className="px-2 py-1 text-right">
                      {s.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
