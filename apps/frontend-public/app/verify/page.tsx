"use client";

import { useState } from "react";

interface VerificationResult {
  tenderNumber: string;
  hash: string;
  verified: boolean;
  winner: {
    bidderId: string;
    name: string;
    totalScore: number;
  };
  workflowStages: {
    stage: string;
    label: string;
    createdAt: string;
  }[];
}

export default function VerifyPage() {
  const [tenderNo, setTenderNo] = useState("");
  const [hash, setHash] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/verification?tenderNo=${encodeURIComponent(
          tenderNo,
        )}&hash=${encodeURIComponent(hash)}`,
      );
      if (!res.ok) throw new Error("Verification failed");
      const json = await res.json();
      setResult(json);
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  const qrUrl =
    result && result.verified
      ? `${process.env.NEXT_PUBLIC_API_URL}/public/verification/qr?tenderNo=${encodeURIComponent(
          result.tenderNumber,
        )}&hash=${encodeURIComponent(result.hash)}`
      : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              Bid Evaluation Platform
            </div>
            <div className="text-xs text-slate-500">
              Public Verification Portal
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Verify Tender Outcome
          </h1>

          <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded border">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Tender Number
              </label>
              <input
                className="mt-1 border rounded w-full px-2 py-1 text-sm"
                value={tenderNo}
                onChange={(e) => setTenderNo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Verification Hash
              </label>
              <input
                className="mt-1 border rounded w-full px-2 py-1 text-sm font-mono"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {result && (
            <div className="bg-white border rounded p-4 space-y-4">
              <div className="flex justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Verification Result
                  </h2>
                  <div className="text-sm text-slate-700 space-y-1">
                    <div>Tender: {result.tenderNumber}</div>
                    <div>Winning Bidder: {result.winner.name}</div>
                    <div>Total Score: {result.winner.totalScore}</div>
                    <div className="text-xs text-slate-500">
                      Hash: <span className="font-mono">{result.hash}</span>
                    </div>
                  </div>
                </div>
                {qrUrl && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500 mb-1">
                      Scan to verify
                    </span>
                    <img
                      src={qrUrl}
                      alt="Verification QR"
                      className="w-24 h-24 border rounded bg-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-1">
                  Workflow Timeline
                </h3>
                <ul className="text-xs text-slate-600">
                  {result.workflowStages.map((s, i) => (
                    <li key={i}>
                      {s.stage} – {s.label} –{" "}
                      {new Date(s.createdAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
