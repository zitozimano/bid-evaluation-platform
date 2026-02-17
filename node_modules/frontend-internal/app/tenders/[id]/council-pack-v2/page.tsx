"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TenderOverviewHeader } from "@/components/tenders/TenderOverviewHeader";

interface CouncilPackV2 {
  tender: {
    id: string;
    number: string;
    description: string;
  };
  bidders: { id: string; name: string }[];
  scoring: { bidderId: string; criterion: string; score: number }[];
}

async function fetchCouncilPackV2(id: string): Promise<CouncilPackV2> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${id}/council-pack-v2`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load council pack v2");
  return res.json();
}

export default function CouncilPackV2Page({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<CouncilPackV2 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCouncilPackV2(params.id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [params.id]);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.bidders.map((b) => {
      const total = data.scoring
        .filter((s) => s.bidderId === b.id)
        .reduce((sum, s) => sum + s.score, 0);
      return { name: b.name, total };
    });
  }, [data]);

  if (loading || !data) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading council pack…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <TenderOverviewHeader
          tender={{
            id: data.tender.id,
            number: data.tender.number,
            description: data.tender.description,
            status: "PUBLISHED",
            createdAt: new Date().toISOString(),
          }}
        />

        {/* Chart: total scores per bidder */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Total Scores per Bidder
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table: detailed scoring */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Detailed Scoring
          </h2>
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-3 py-2 text-left">Bidder</th>
                <th className="px-3 py-2 text-left">Criterion</th>
                <th className="px-3 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.scoring.map((s, idx) => {
                const bidder = data.bidders.find(
                  (b) => b.id === s.bidderId,
                );
                return (
                  <tr key={idx} className="border-t">
                    <td className="px-3 py-2">
                      {bidder ? bidder.name : s.bidderId}
                    </td>
                    <td className="px-3 py-2">{s.criterion}</td>
                    <td className="px-3 py-2 text-right">
                      {s.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Export JSON/CSV for council pack */}
        <div className="bg-white border rounded p-4 flex gap-2">
          <button
            onClick={() => {
              const blob = new Blob(
                [JSON.stringify(data, null, 2)],
                { type: "application/json" },
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `council-pack-v2-${data.tender.number}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-2 bg-slate-900 text-white rounded text-sm"
          >
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
