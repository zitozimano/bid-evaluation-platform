"use client";

import { useEffect, useState } from "react";

async function fetchTenders(params: {
  search?: string;
  category?: string;
  from?: string;
  to?: string;
}) {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.category) qs.set("category", params.category);
  if (params.from) qs.set("from", params.from);
  if (params.to) qs.set("to", params.to);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tenders?${qs.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tenders");
  return res.json();
}

export default function PublicTendersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await fetchTenders({ search, category, from, to });
    setTenders(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Published Tender Awards
        </h1>

        <div className="bg-white border rounded p-3 flex flex-wrap gap-3 text-sm">
          <input
            className="border rounded px-2 py-1 flex-1 min-w-[140px]"
            placeholder="Search tender number or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className="border rounded px-2 py-1 w-32"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
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

        <div className="bg-white border rounded">
          {loading ? (
            <div className="p-4 text-sm text-slate-500">Loading…</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-3 py-2">Tender</th>
                  <th className="text-left px-3 py-2">Category</th>
                  <th className="text-left px-3 py-2">Winner</th>
                  <th className="text-left px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {tenders.map((t) => (
                  <tr key={t.tenderNumber} className="border-b">
                    <td className="px-3 py-2">
                      <a
                        href={`/tenders/${encodeURIComponent(t.tenderNumber)}`}
                        className="text-blue-600 hover:underline"
                      >
                        {t.tenderNumber}
                      </a>
                      <div className="text-xs text-slate-500">
                        {t.description}
                      </div>
                    </td>
                    <td className="px-3 py-2">{t.category ?? "-"}</td>
                    <td className="px-3 py-2">
                      {t.winner ? t.winner.bidderId : "-"}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
