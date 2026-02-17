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
import { AnalyticsSidebar } from "@/components/layout/AnalyticsSidebar";

interface RuleStat {
  ruleCode: string;
  ruleName: string;
  complianceRate: number;
}

interface ComplianceDashboard {
  tenderId: string;
  tenderNumber: string;
  overallCompliance: number;
  rules: RuleStat[];
}

async function fetchCompliance(
  tenderId: string,
): Promise<ComplianceDashboard> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${tenderId}/compliance-dashboard`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load compliance dashboard");
  return res.json();
}

export default function ComplianceDashboardPage() {
  const [tenderId, setTenderId] = useState("");
  const [data, setData] = useState<ComplianceDashboard | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLoad() {
    if (!tenderId) return;
    setLoading(true);
    try {
      const d = await fetchCompliance(tenderId);
      setData(d);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AnalyticsSidebar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Procurement Compliance Dashboard
        </h1>

        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Tender ID
            </label>
            <input
              value={tenderId}
              onChange={(e) => setTenderId(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              placeholder="Enter Tender ID"
            />
          </div>
          <button
            onClick={handleLoad}
            className="px-3 py-2 bg-slate-900 text-white rounded text-sm"
          >
            {loading ? "Loading…" : "Load"}
          </button>
        </div>

        {data && (
          <>
            <div className="bg-white border rounded p-4">
              <div className="text-sm text-slate-600 mb-2">
                Tender: {data.tenderNumber}
              </div>
              <div className="text-xs text-slate-500">
                Overall Compliance
              </div>
              <div className="text-4xl font-bold text-emerald-600">
                {data.overallCompliance}%
              </div>
            </div>

            <div className="bg-white border rounded p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Rule‑level Compliance
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.rules}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ruleCode" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complianceRate" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
