"use client";

import { useState } from "react";

interface TenderSummaryProps {
  tender: {
    id: string;
    number: string;
    description: string;
    status?: string;
  };
}

export function TenderSummary({ tender }: TenderSummaryProps) {
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    hash?: string;
    runNumber?: number;
  } | null>(null);

  async function handlePublish() {
    setPublishing(true);
    setPublishResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${tender.id}/publish`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Failed to publish tender");

      const json = await res.json();
      setPublishResult({
        hash: json.hash,
        runNumber: json.document.runNumber,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to publish tender");
    } finally {
      setPublishing(false);
    }
  }

  async function updateStatus(newStatus: string) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tenders/${tender.id}/status/${newStatus}`,
        { method: "POST", credentials: "include" },
      );
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  return (
    <div className="border rounded bg-white p-4 space-y-4 shadow-sm">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          <a
            href={`/tenders/${tender.id}`}
            className="hover:underline"
          >
            {tender.number}
          </a>
        </h1>
        <p className="text-sm text-slate-600">{tender.description}</p>
        <p className="text-xs text-slate-500 mt-1">
          Status: {tender.status ?? "DRAFT"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Publish Tender */}
        <button
          onClick={handlePublish}
          disabled={publishing}
          className="px-3 py-2 bg-emerald-600 text-white rounded text-sm disabled:opacity-50"
        >
          {publishing ? "Publishing…" : "Publish Tender"}
        </button>

        {/* Insights */}
        <a
          href={`/tenders/${tender.id}/insights`}
          className="px-3 py-2 bg-slate-200 text-slate-800 rounded text-sm"
        >
          Insights
        </a>

        {/* Heatmap */}
        <a
          href={`/tenders/${tender.id}/heatmap`}
          className="px-3 py-2 bg-slate-200 text-slate-800 rounded text-sm"
        >
          Risk Heatmap
        </a>

        {/* Timeline */}
        <a
          href={`/tenders/${tender.id}/timeline`}
          className="px-3 py-2 bg-slate-200 text-slate-800 rounded text-sm"
        >
          Timeline
        </a>

        {/* Edit */}
        <a
          href={`/tenders/${tender.id}/edit`}
          className="px-3 py-2 bg-slate-100 text-slate-800 rounded text-sm"
        >
          Edit
        </a>

        {/* Activity Log */}
        <a
          href={`/tenders/${tender.id}/activity`}
          className="px-3 py-2 bg-slate-100 text-slate-800 rounded text-sm"
        >
          Activity Log
        </a>

        {/* Council Pack */}
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/evaluation/tenders/${tender.id}/council-pack.pdf`}
          className="px-3 py-2 bg-slate-900 text-white rounded text-sm"
        >
          Council Pack PDF
        </a>

        {/* Audit Bundle */}
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tender.id}/audit-bundle.zip`}
          className="px-3 py-2 bg-slate-700 text-white rounded text-sm"
        >
          Audit Bundle
        </a>
      </div>

      {/* Status Workflow Buttons */}
      <div className="flex flex-wrap gap-2">
        {tender.status === "DRAFT" && (
          <button
            onClick={() => updateStatus("PUBLISHED")}
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Mark as Published
          </button>
        )}

        {tender.status === "PUBLISHED" && (
          <>
            <button
              onClick={() => updateStatus("AWARDED")}
              className="px-3 py-2 bg-emerald-600 text-white rounded text-sm"
            >
              Mark as Awarded
            </button>

            <button
              onClick={() => updateStatus("ARCHIVED")}
              className="px-3 py-2 bg-slate-600 text-white rounded text-sm"
            >
              Archive
            </button>
          </>
        )}

        {tender.status === "AWARDED" && (
          <button
            onClick={() => updateStatus("ARCHIVED")}
            className="px-3 py-2 bg-slate-600 text-white rounded text-sm"
          >
            Archive
          </button>
        )}
      </div>

      {/* Publish Result */}
      {publishResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-xs text-slate-700 space-y-1">
          <div>
            <span className="font-semibold">Published Run:</span>{" "}
            {publishResult.runNumber}
          </div>
          <div>
            <span className="font-semibold">Verification Hash:</span>{" "}
            <span className="font-mono">{publishResult.hash}</span>
          </div>
        </div>
      )}
    </div>
  );
}
