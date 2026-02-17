"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface LogEntry {
  id: string;
  createdAt: string;
  role: string;
  endpoint: string;
  ip: string | null;
  userAgent: string | null;
  userId: string;
}

async function fetchLogs(params: {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}) {
  const qs = new URLSearchParams();
  if (params.from) qs.set("from", params.from);
  if (params.to) qs.set("to", params.to);
  if (params.page !== undefined) qs.set("page", String(params.page));
  if (params.pageSize !== undefined) qs.set("pageSize", String(params.pageSize));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/verification-logs?${qs.toString()}`,
    { credentials: "include" },
  );
  if (!res.ok) throw new Error("Failed to load logs");
  return res.json();
}

type SortKey = "createdAt" | "userId" | "role";

export default function VerificationLogsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const pageSize = 50;

  async function load() {
    setLoading(true);
    const data = await fetchLogs({ from, to, page, pageSize });
    setLogs(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const csvUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/verification-logs.csv?from=${from}&to=${to}`;
  const zipUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/verification-logs.zip?from=${from}&to=${to}`;

  const filteredSortedLogs = useMemo(() => {
    let result = [...logs];

    if (filterRole) {
      result = result.filter((l) => l.role === filterRole);
    }
    if (filterUser) {
      result = result.filter((l) =>
        l.userId.toLowerCase().includes(filterUser.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      let av: any = a[sortKey];
      let bv: any = b[sortKey];

      if (sortKey === "createdAt") {
        av = new Date(a.createdAt).getTime();
        bv = new Date(b.createdAt).getTime();
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [logs, filterRole, filterUser, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Verification Logs (Public Portal)
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
            onClick={() => {
              setPage(0);
              load();
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Apply
          </button>

          <input
            className="border rounded px-2 py-1"
            placeholder="Filter by userId"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All roles</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="AUDIT">AUDIT</option>
            <option value="INTERNAL-AUDIT">INTERNAL-AUDIT</option>
          </select>

          <a
            href={csvUrl}
            className="px-3 py-1 bg-emerald-600 text-white rounded"
          >
            Export CSV
          </a>
          <a
            href={zipUrl}
            className="px-3 py-1 bg-slate-700 text-white rounded"
          >
            Download ZIP
          </a>
        </div>

        <div className="bg-white border rounded overflow-auto">
          {loading ? (
            <div className="p-4 text-sm text-slate-500">Loading…</div>
          ) : (
            <>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th
                      className="text-left px-2 py-1 cursor-pointer"
                      onClick={() => toggleSort("createdAt")}
                    >
                      Time
                    </th>
                    <th
                      className="text-left px-2 py-1 cursor-pointer"
                      onClick={() => toggleSort("userId")}
                    >
                      User
                    </th>
                    <th
                      className="text-left px-2 py-1 cursor-pointer"
                      onClick={() => toggleSort("role")}
                    >
                      Role
                    </th>
                    <th className="text-left px-2 py-1">IP</th>
                    <th className="text-left px-2 py-1">User Agent</th>
                    <th className="text-left px-2 py-1">Drill‑down</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSortedLogs.map((l) => (
                    <tr key={l.id} className="border-b">
                      <td className="px-2 py-1">
                        {new Date(l.createdAt).toLocaleString()}
                      </td>
                      <td className="px-2 py-1">{l.userId}</td>
                      <td className="px-2 py-1">{l.role}</td>
                      <td className="px-2 py-1">{l.ip ?? "-"}</td>
                      <td className="px-2 py-1 truncate max-w-xs">
                        {l.userAgent ?? "-"}
                      </td>
                      <td className="px-2 py-1">
                        <Link
                          href={`/admin/verification-logs/${l.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center px-3 py-2 text-xs text-slate-600">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="px-2 py-1 border rounded disabled:opacity-40"
                >
                  Previous
                </button>
                <div>Page {page + 1}</div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-2 py-1 border rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
