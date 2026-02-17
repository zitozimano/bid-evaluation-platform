"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BidderScoringDrawer } from "@/components/evaluation/BidderScoringDrawer";
import { AnalyticsSidebar } from "@/components/layout/AnalyticsSidebar";

interface Insights {
  tenderId: string;
  tenderNumber: string;
  riskScore: number;
  complianceRate: number;
  functionalityPassRate: number;
  bbbeeDist: Record<string, number>;
  priceVsScore: { bidder: string; price: number; totalScore: number }[];
  workflowSummary: Record<string, number>;
  bidderComparison: {
    bidderId: string;
    bidder: string;
    totalScore: number;
    price: number;
    bbbeeLevel: number | null;
    complianceRate: number;
    exceptions: number;
  }[];
}

async function fetchInsights(id: string): Promise<Insights> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${id}/insights`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load insights");
  return res.json();
}

export default function TenderInsightsPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerBidderId, setDrawerBidderId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    fetchInsights(params.id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AnalyticsSidebar />
        <main className="flex-1 p-6 text-slate-600 text-sm">
          Loading insights…
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AnalyticsSidebar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Tender Insights — {data.tenderNumber}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">Risk Score</div>
            <div className="text-4xl font-bold text-red-600">
              {data.riskScore}
            </div>
          </div>
          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">Compliance Rate</div>
            <div className="text-4xl font-bold text-emerald-600">
              {data.complianceRate}%
            </div>
          </div>
          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">
              Functionality Pass Rate
            </div>
            <div className="text-4xl font-bold text-indigo-600">
              {data.functionalityPassRate}%
            </div>
          </div>
        </div>

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Price vs Score
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.priceVsScore}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bidder" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#10B981" />
              <Bar dataKey="totalScore" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Workflow Duration Summary
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={Object.entries(data.workflowSummary).map(
                ([stage, days]) => ({ stage, days }),
              )}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="days"
                stroke="#7C3AED"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Bidder Comparison
          </h2>
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="px-2 py-1 text-left">Bidder</th>
                <th className="px-2 py-1 text-left">Score</th>
                <th className="px-2 py-1 text-left">Price</th>
                <th className="px-2 py-1 text-left">BBBEE</th>
                <th className="px-2 py-1 text-left">Compliance</th>
                <th className="px-2 py-1 text-left">Exceptions</th>
                <th className="px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {data.bidderComparison.map((b) => (
                <tr key={b.bidderId} className="border-b">
                  <td className="px-2 py-1">
                    <a
                      href={`/bidders/${b.bidderId}/intelligence`}
                      className="text-indigo-600 hover:underline"
                    >
                      {b.bidder}
                    </a>
                  </td>
                  <td className="px-2 py-1">{b.totalScore}</td>
                  <td className="px-2 py-1">
                    R{b.price.toLocaleString()}
                  </td>
                  <td className="px-2 py-1">{b.bbbeeLevel ?? "-"}</td>
                  <td className="px-2 py-1">
                    {(b.complianceRate * 100).toFixed(0)}%
                  </td>
                  <td className="px-2 py-1">{b.exceptions}</td>
                  <td className="px-2 py-1">
                    <button
                      className="text-xs text-indigo-600 hover:underline"
                      onClick={() => setDrawerBidderId(b.bidderId)}
                    >
                      View scoring
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <BidderScoringDrawer
        tenderId={params.id}
        bidderId={drawerBidderId}
        open={!!drawerBidderId}
        onClose={() => setDrawerBidderId(null)}
      />
    </div>
  );
}
