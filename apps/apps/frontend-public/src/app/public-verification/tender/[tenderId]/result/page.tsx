"use client";

import { useState } from "react";
import { apiGet } from "@/lib/api";
import type { ResultVerificationResponse } from "@/lib/types";
import Link from "next/link";

interface Props {
  params: { tenderId: string };
}

export default function ResultVerificationPage({ params }: Props) {
  const { tenderId } = params;

  const [hashInput, setHashInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResultVerificationResponse | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setData(null);

    const trimmed = hashInput.trim();
    if (!trimmed) {
      setError("Please enter a verification hash.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiGet<ResultVerificationResponse>(
        `/public/tender/${encodeURIComponent(tenderId)}/verify/${encodeURIComponent(trimmed)}`
      );
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to verify bidder result.");
    } finally {
      setLoading(false);
    }
  };

  const verified = data?.verified ?? false;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Bidder Result Verification
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Tender ID: {tenderId}
            </p>
          </div>
          <Link
            href={`/public-verification/tender/${encodeURIComponent(tenderId)}`}
            className="text-xs font-medium text-sky-700 hover:underline"
          >
            Back to Tender Overview
          </Link>
        </header>

        <section className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-medium text-slate-900">
            Enter Verification Hash
          </h2>
          <form onSubmit={handleVerify} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Paste verification hash from award letter or PDF"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </section>

        {data && (
          <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${
                  verified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {verified ? "✔" : "✖"}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {verified ? "Bidder Result Verified" : "Verification Failed"}
                </p>
                <p className="text-xs text-slate-600">
                  {data.message ??
                    (verified
                      ? "This bidder’s evaluation result matches the official tamper‑proof record."
                      : "No matching evaluation result found for this hash.")}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 p-4 text-sm text-slate-700">
                <p><span className="font-medium">Tender ID:</span> {data.tenderId}</p>
                <p><span className="font-medium">Bidder:</span> {data.bidderName}</p>
                <p><span className="font-medium">Total Score:</span> {data.totalScore}</p>
                <p>
                  <span className="font-medium">Qualified:</span>{" "}
                  {data.qualified ? "Yes" : "No"}
                </p>
                <p><span className="font-medium">Evaluation Run:</span> {data.runNumber}</p>
              </div>

              <div className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Run Hash
                </p>
                <p className="mt-1 break-all font-mono text-xs text-slate-800">
                  {data.runHash}
                </p>
              </div>
            </div>

            <details className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
              <summary className="cursor-pointer text-xs font-medium text-slate-800">
                View Verification Certificate (JSON)
              </summary>
              <pre className="mt-2 overflow-x-auto rounded bg-slate-900 p-3 text-[11px] text-slate-100">
{JSON.stringify(
  {
    verified: data.verified,
    tenderId: data.tenderId,
    bidderName: data.bidderName,
    totalScore: data.totalScore,
    qualified: data.qualified,
    runNumber: data.runNumber,
    runHash: data.runHash,
  },
  null,
  2
)}
              </pre>
            </details>
          </section>
        )}
      </div>
    </main>
  );
}
