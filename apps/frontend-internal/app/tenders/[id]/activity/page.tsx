"use client";

import { useEffect, useState } from "react";

interface ActivityItem {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

async function fetchActivity(id: string): Promise<ActivityItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders/${id}/activity`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load activity");
  return res.json();
}

export default function TenderActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity(params.id)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading activity…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Tender Activity Log
        </h1>

        {items.length === 0 ? (
          <div className="text-sm text-slate-500">
            No activity recorded.
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((a) => (
              <li
                key={a.id}
                className="bg-white border rounded p-3 text-sm"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800">
                    {a.type}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-slate-700 mt-1">{a.message}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
