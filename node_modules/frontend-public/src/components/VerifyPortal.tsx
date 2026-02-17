"use client";

import { useState } from "react";
import { verifyHash, VerificationResult } from "@/lib/api";

export default function VerifyPortal() {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const trimmed = hash.trim();
    if (!trimmed) {
      setError("Please enter a verification hash.");
      return;
    }

    try {
      setLoading(true);
      const data = await verifyHash(trimmed);
      setResult(data);
    } catch (err: any) {
      setError(err?.message ?? "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-50 mb-2">
        Verify Evaluation Hash
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Enter the verification hash printed on the evaluation pack or report.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Verification Hash
          </label>
          <input
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="e.g. 9f3c2a7b-..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-md border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Verification Result
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                result.valid
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/40"
                  : "bg-red-500/10 text-red-400 border border-red-500/40"
              }`}
            >
              {result.valid ? "Valid" : "Invalid"}
            </span>
          </div>

          <dl className="space-y-1 text-xs text-slate-300">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Hash</dt>
              <dd className="font-mono text-right break-all">{result.hash}</dd>
            </div>

            {result.tenderId && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Tender ID</dt>
                <dd className="text-right">{result.tenderId}</dd>
              </div>
            )}

            {typeof result.runNumber !== "undefined" && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Run Number</dt>
                <dd className="text-right">{result.runNumber}</dd>
              </div>
            )}

            {result.timestamp && (
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Timestamp</dt>
                <dd className="text-right">
                  {new Date(result.timestamp).toLocaleString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
