"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTenderPage() {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenders`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number, description }),
        },
      );

      if (!res.ok) throw new Error("Failed to create tender");

      const json = await res.json();
      router.push(`/tenders/${json.id}/edit`);
    } catch (err) {
      console.error(err);
      alert("Failed to create tender");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          New Tender
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Tender Number
            </label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full"
              rows={4}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 text-white rounded text-sm"
          >
            {saving ? "Saving…" : "Create Tender"}
          </button>
        </form>
      </div>
    </div>
  );
}
