"use client";

import { useEffect, useState } from "react";

interface DailyPoint {
  date: string;
  count: number;
}

interface RolePoint {
  role: string;
  count: number;
}

interface AnalyticsResponse {
  daily: DailyPoint[];
  roles: RolePoint[];
  total: number;
}

async function fetchAnalytics(params: { from?: string; to?: string }) {
  const qs = new URLSearchParams();
  if (params.from) qs.set("from", params.from);
  if (params.to) qs.set("to", params.to);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/verification-analytics?${qs.toString()}`,
    { credentials: "include" },
  );
  if (!res.ok) throw new Error("Failed to load analytics");
  return res.json();
}

export default function VerificationAnalyticsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetchAnalytics({ from, to });
    setData(res);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const maxCount =
    data?.daily.reduce((m, p) => (p.count > m ? p.count : m), 0) ?? 1;
  const totalRoles = data?.roles.reduce((s, r) => s + r.count, 0) ?? 1;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Verification Analytics
        </h1>

        <div className="bg-white border rounded p-3 flex flex-wrap gap-3 text-sm">
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button
            onClick={load}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Apply
          </button>
        </div>

        {loading || !data ? (
          <div className="bg-white border rounded p-4 text-sm text-slate-500">
            Loading…
          </div>
        ) : (
          <>
            <div className="bg-white border rounded p-4">
              <div className="text-sm text-slate-700">
                Total verification events:{" "}
                <span className="font-semibold">{data.total}</span>
              </div>
            </div>

            {/* Line chart */}
            <div className="bg-white border rounded p-4 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">
                Daily events (line)
              </h2>
              <svg viewBox="0 0 400 160" className="w-full h-40">
                <line
                  x1={30}
                  y1={10}
                  x2={30}
                  y2={140}
                  stroke="#CBD5F5"
                  strokeWidth={1}
                />
                <line
                  x1={30}
                  y1={140}
                  x2={390}
                  y2={140}
                  stroke="#CBD5F5"
                  strokeWidth={1}
                />
                {data.daily.map((p, i) => {
                  const x =
                    30 +
                    (i * (360 / Math.max(data.daily.length - 1, 1)));
                  const y = 140 - (p.count / maxCount) * 120;
                  return (
                    <g key={p.date}>
                      <circle cx={x} cy={y} r={3} fill="#2563EB" />
                      <text
                        x={x}
                        y={150}
                        fontSize={8}
                        textAnchor="middle"
                        fill="#6B7280"
                      >
                        {p.date.slice(5)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bar chart */}
            <div className="bg-white border rounded p-4 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">
                Daily events (bar)
              </h2>
              <svg viewBox="0 0 400 160" className="w-full h-40">
                <line
                  x1={30}
                  y1={10}
                  x2={30}
                  y2={140}
                  stroke="#CBD5F5"
                  strokeWidth={1}
                />
                <line
                  x1={30}
                  y1={140}
                  x2={390}
                  y2={140}
                  stroke="#CBD5F5"
                  strokeWidth={1}
                />
                {data.daily.map((p, i) => {
                  const x =
                    30 +
                    (i * (360 / Math.max(data.daily.length, 1))) +
                    5;
                  const height = (p.count / maxCount) * 120;
                  const y = 140 - height;
                  const width = 360 / Math.max(data.daily.length, 1) - 10;
                  return (
                    <g key={p.date}>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill="#4F46E5"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Donut chart by role */}
            <div className="bg-white border rounded p-4 space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">
                Events by role (donut)
              </h2>
              <div className="flex items-center gap-6">
                <svg viewBox="0 0 160 160" className="w-40 h-40">
                  <circle
                    cx={80}
                    cy={80}
                    r={50}
                    fill="transparent"
                    stroke="#E5E7EB"
                    strokeWidth={20}
                  />
                  {data.roles.reduce(
                    (acc, r) => {
                      const { startAngle } = acc;
                      const fraction = r.count / totalRoles;
                      const endAngle = startAngle + fraction * Math.PI * 2;

                      const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
                      const x1 = 80 + 50 * Math.cos(startAngle);
                      const y1 = 80 + 50 * Math.sin(startAngle);
                      const x2 = 80 + 50 * Math.cos(endAngle);
                      const y2 = 80 + 50 * Math.sin(endAngle);

                      const pathData = `
                        M ${x1} ${y1}
                        A 50 50 0 ${largeArc} 1 ${x2} ${y2}
                      `;

                      const colorMap: Record<string, string> = {
                        PUBLIC: "#60A5FA",
                        AUDIT: "#F97316",
                        "INTERNAL-AUDIT": "#22C55E",
                        ADMIN: "#A855F7",
                      };
                      const color =
                        colorMap[r.role] || "#0EA5E9";

                      acc.paths.push(
                        <path
                          key={r.role}
                          d={pathData}
                          stroke={color}
                          strokeWidth={20}
                          fill="none"
                        />,
                      );

                      acc.startAngle = endAngle;
                      return acc;
                    },
                    { startAngle: 0, paths: [] as JSX.Element[] },
                  ).paths}
                </svg>

                <div className="space-y-1 text-sm text-slate-700">
                  {data.roles.map((r) => (
                    <div key={r.role}>
                      <span className="font-semibold">{r.role}</span>:{" "}
                      {r.count}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
