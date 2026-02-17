"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface StatusMetric {
  status: string;
  count: number;
}

interface DashboardResponse {
  total: number;
  byStatus: StatusMetric[];
}

async function fetchDashboard(): Promise<DashboardResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders/dashboard`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export default function TenderDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Tender Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">Total Tenders</div>
            <div className="text-4xl font-bold text-slate-800">
              {data.total}
            </div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">
              Published Tenders
            </div>
            <div className="text-4xl font-bold text-blue-600">
              {data.byStatus.find((s) => s.status === "PUBLISHED")
                ?.count ?? 0}
            </div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="text-xs text-slate-500">Awarded Tenders</div>
            <div className="text-4xl font-bold text-emerald-600">
              {data.byStatus.find((s) => s.status === "AWARDED")
                ?.count ?? 0}
            </div>
          </div>
        </div>

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Tenders by Status
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.byStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
