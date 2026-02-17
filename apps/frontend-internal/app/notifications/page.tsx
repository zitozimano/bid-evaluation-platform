"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

async function fetchNotifications(userId: string): Promise<Notification[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load notifications");
  return res.json();
}

export default function NotificationsInboxPage() {
  const userId = "cfo"; // replace with real auth context
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications(userId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Notifications
      </h1>

      {loading ? (
        <div className="text-sm text-slate-600">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-slate-500">No notifications.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li
              key={n.id}
              className="bg-white border rounded p-3 shadow-sm text-sm"
            >
              <div className="flex justify-between">
                <span>{n.message}</span>
                <span className="text-xs text-slate-500">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
