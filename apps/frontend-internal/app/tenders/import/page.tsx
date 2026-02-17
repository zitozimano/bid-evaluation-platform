"use client";

import { useState } from "react";

export default function TenderImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ imported: number } | null>(
    null,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setImporting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenders/import`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed to import CSV");

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert("Failed to import CSV");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Bulk Tender Import
        </h1>

        <p className="text-sm text-slate-600">
          Upload a CSV file with columns: <strong>number,description</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />

          <button
            type="submit"
            disabled={importing || !file}
            className="px-4 py-2 bg-slate-900 text-white rounded text-sm"
          >
            {importing ? "Importing…" : "Import CSV"}
          </button>
        </form>

        {result && (
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-slate-700">
            Imported tenders: {result.imported}
          </div>
        )}
      </div>
    </div>
  );
}
