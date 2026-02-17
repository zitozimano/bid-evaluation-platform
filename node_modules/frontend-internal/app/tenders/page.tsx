"use client";

import { useEffect, useState } from "react";
import { TenderSummary } from "@/components/tenders/TenderSummary";

interface Tender {
  id: string;
  number: string;
  description: string;
  status: string;
}

async function fetchTenders(params: {
  search?: string;
  status?: string;
}): Promise<Tender[]> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders?${qs.toString()}`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tenders");
  return res.json();
}

export default function TendersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await fetchTenders({ search, status });
    setTenders(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [search, status]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Tenders</h1>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
              placeholder="Tender number or description"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="AWARDED">Awarded</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Tender List */}
        {loading ? (
          <div className="text-sm text-slate-500">Loading…</div>
        ) : tenders.length === 0 ? (
          <div className="text-sm text-slate-500">No tenders found.</div>
        ) : (
          <div className="space-y-3">
            {tenders.map((t) => (
              <TenderSummary key={t.id} tender={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
