"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface TimelineItem {
  tenderId: string;
  tenderNumber: string;
  createdAt: string;
  totalScore: number;
  price: number;
  awarded: boolean;
}

interface IntelligenceResponse {
  bidderId: string;
  totalTenders: number;
  avgScore: number;
  avgPrice: number;
  winRate: number;
  timeline: TimelineItem[];
}

async function fetchIntelligence(
  bidderId: string,
): Promise<IntelligenceResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/evaluation/bidders/${bidderId}/intelligence`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load bidder intelligence");
  return res.json();
}

export default function BidderIntelligencePage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<IntelligenceResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntelligence(params.id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading || !data) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading bidder intelligence…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Bidder Intelligence
          </h1>

          <div className="flex gap-2">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/evaluation/bidders/${params.id}/intelligence.csv`}
              className="px-3 py-2 bg-slate-700 text-white rounded text-xs"
            >
              Export CSV
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/evaluation/bidders/${params.id}/intelligence.json`}
              className="px-3 py-2 bg-slate-700 text-white rounded text-xs"
            >
              Export JSON
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border rounded p-3 text-sm">
            <div className="text-xs text-slate-500">Total Tenders</div>
            <div className="text-xl font-bold">{data.totalTenders}</div>
          </div>
          <div className="bg-white border rounded p-3 text-sm">
            <div className="text-xs text-slate-500">Average Score</div>
            <div className="text-xl font-bold">
              {data.avgScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-white border rounded p-3 text-sm">
            <div className="text-xs text-slate-500">Average Price</div>
            <div className="text-xl font-bold">
              R{data.avgPrice.toFixed(0)}
            </div>
          </div>
          <div className="bg-white border rounded p-3 text-sm">
            <div className="text-xs text-slate-500">Win Rate</div>
            <div className="text-xl font-bold">
              {(data.winRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Score Trend */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Score Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tenderNumber" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalScore"
                stroke="#2563EB"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Price Trend */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Price Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.timeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tenderNumber" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tender History Table */}
        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Tender History
          </h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="px-2 py-1 text-left">Tender</th>
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-right">Score</th>
                <th className="px-2 py-1 text-right">Price</th>
                <th className="px-2 py-1 text-left">Awarded</th>
              </tr>
            </thead>
            <tbody>
              {data.timeline.map((t) => (
                <tr key={t.tenderId} className="border-b">
                  <td className="px-2 py-1">{t.tenderNumber}</td>
                  <td className="px-2 py-1">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-1 text-right">
                    {t.totalScore}
                  </td>
                  <td className="px-2 py-1 text-right">
                    R{t.price.toLocaleString()}
                  </td>
                  <td className="px-2 py-1">
                    {t.awarded ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
