"use client";

import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { createAuditAnalyticsApi } from "@bidplatform/api";
import {
  AnalyticsAccessLogItem,
  AuditUser,
  AuditTender
} from "@bidplatform/models";
import { AuditAnalyticsFilters } from "@bidplatform/api/modules/auditAnalytics";

const api = createAuditAnalyticsApi(
  // createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })
);

const endpointPresets = [
  "/analytics/overview",
  "/analytics/bidders",
  "/analytics/process",
  "/analytics/compliance",
  "/analytics/risk"
];

export default function AuditAnalyticsPage() {
  const [logs, setLogs] = useState<AnalyticsAccessLogItem[]>([]);
  const [users, setUsers] = useState<AuditUser[]>([]);
  const [tenders, setTenders] = useState<AuditTender[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [userId, setUserId] = useState("");
  const [tenderId, setTenderId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [total, setTotal] = useState(0);

  const [selectedUser, setSelectedUser] = useState<AuditUser | null>(null);

  const buildFilters = useCallback(
    (override?: Partial<AuditAnalyticsFilters>): AuditAnalyticsFilters => ({
      from: from || undefined,
      to: to || undefined,
      endpoint: endpoint || undefined,
      userId: userId || undefined,
      tenderId: tenderId || undefined,
      page,
      pageSize,
      ...override
    }),
    [from, to, endpoint, userId, tenderId, page, pageSize]
  );

  async function loadInitial() {
    setLoading(true);
    const [logsRes, usersRes, tendersRes] = await Promise.all([
      api.list(buildFilters({ page: 1 })),
      api.listUsers(),
      api.listTenders()
    ]);
    setLogs(logsRes.data.logs);
    setTotal(logsRes.data.total);
    setPage(1);
    setUsers(usersRes.data);
    setTenders(tendersRes.data);
    setLoading(false);
  }

  async function loadMore() {
    if (logs.length >= total) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const res = await api.list(buildFilters({ page: nextPage }));
    setLogs((prev) => [...prev, ...res.data.logs]);
    setPage(nextPage);
    setTotal(res.data.total);
    setLoadingMore(false);
  }

  useEffect(() => {
    void loadInitial();
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (!loadingMore && logs.length < total) {
          loadMore();
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [logs, total, loadingMore]);

  function handleApplyFilters() {
    setPage(1);
    void (async () => {
      setLoading(true);
      const res = await api.list(buildFilters({ page: 1 }));
      setLogs(res.data.logs);
      setTotal(res.data.total);
      setLoading(false);
    })();
  }

  function handleClearFilters() {
    setFrom("");
    setTo("");
    setEndpoint("");
    setUserId("");
    setTenderId("");
    setPage(1);
    void loadInitial();
  }

  async function handleExportCsv() {
    const blob = await api.exportCsv(buildFilters());
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-access-export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function openUserProfile(user: AuditUser) {
    setSelectedUser(user);
  }

  function closeUserProfile() {
    setSelectedUser(null);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics Access Audit</h1>

      {/* Filters */}
      <div className="p-4 bg-white border rounded-md space-y-3">
        {/* Endpoint preset chips */}
        <div className="flex flex-wrap gap-2">
          {endpointPresets.map((ep) => (
            <button
              key={ep}
              onClick={() => setEndpoint(ep)}
              className={clsx(
                "px-2 py-1 text-xs rounded-full border",
                endpoint === ep
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              )}
            >
              {ep}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              From
            </label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1 text-sm"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              To
            </label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1 text-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Endpoint (contains)
            </label>
            <input
              type="text"
              placeholder="/analytics"
              className="w-full border rounded px-2 py-1 text-sm"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              User
            </label>
            <select
              className="w-full border rounded px-2 py-1 text-sm"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">All users</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name ?? u.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tender
            </label>
            <select
              className="w-full border rounded px-2 py-1 text-sm"
              value={tenderId}
              onChange={(e) => setTenderId(e.target.value)}
            >
              <option value="">All tenders</option>
              {tenders.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.number} — {t.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleExportCsv}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Export CSV
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleClearFilters}
              className="px-3 py-1 text-sm border rounded-md"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-3 py-1 text-sm rounded-md bg-slate-900 text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="bg-white border rounded-md overflow-hidden">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="text-left py-2 px-3">When</th>
                <th className="text-left py-2 px-3">User</th>
                <th className="text-left py-2 px-3">Role</th>
                <th className="text-left py-2 px-3">Endpoint</th>
                <th className="text-left py-2 px-3">IP</th>
                <th className="text-left py-2 px-3">User Agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const user = users.find((u) => u.id === log.userId) ?? {
                  id: log.userId,
                  name: log.user.name,
                  email: log.user.email,
                  role: log.role
                };

                return (
                  <tr key={log.id} className="border-b">
                    <td className="py-1 px-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-1 px-3">
                      <button
                        className="text-sky-700 underline"
                        onClick={() => openUserProfile(user)}
                      >
                        {log.user.name ?? log.user.email}
                      </button>
                    </td>
                    <td className="py-1 px-3">{log.role}</td>
                    <td className="py-1 px-3">{log.endpoint}</td>
                    <td className="py-1 px-3">{log.ip}</td>
                    <td className="py-1 px-3 truncate max-w-xs">
                      {log.userAgent}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {logs.length < total && (
            <div className="p-3 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-3 py-1 text-sm border rounded-md"
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* User profile modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-full max-w-md p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">User profile</h2>
              <button
                onClick={closeUserProfile}
                className="text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Name: </span>
                {selectedUser.name ?? "—"}
              </