"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Tender {
  id: string;
  number: string;
  description: string;
  status: string;
}

async function fetchTender(id: string): Promise<Tender> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders/${id}`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tender");
  return res.json();
}

export default function EditTenderPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTender(params.id)
      .then((t) => {
        setTender(t);
        setNumber(t.number);
        setDescription(t.description);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenders/${params.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number, description }),
        },
      );

      if (!res.ok) throw new Error("Failed to update tender");

      router.push("/tenders");
    } catch (err) {
      console.error(err);
      alert("Failed to update tender");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !tender) {
    return (
      <div className="p-6 text-sm text-slate-600">Loading tender…</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Edit Tender
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
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
