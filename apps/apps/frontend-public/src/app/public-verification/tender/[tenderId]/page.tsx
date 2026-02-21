import { apiGet } from "@/lib/api";
import type { PublicTenderSummary } from "@/lib/types";
import Link from "next/link";

interface Props {
  params: { tenderId: string };
}

export default async function TenderOverviewPage({ params }: Props) {
  const { tenderId } = params;

  let summary: PublicTenderSummary | null = null;
  let error: string | null = null;

  try {
    summary = await apiGet<PublicTenderSummary>(
      `/public/tender/${encodeURIComponent(tenderId)}/summary`
    );
  } catch (e: any) {
    error = e.message || "Failed to load tender summary.";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Tender Overview
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Tender ID: {tenderId}
            </p>
          </div>
          <Link
            href="/public-verification"
            className="text-xs font-medium text-sky-700 hover:underline"
          >
            Back to Verification Portal
          </Link>
        </header>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {summary && (
          <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Tender
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {summary.tenderNumber || summary.tenderId}
                </p>
                <p className="text-sm text-slate-600">{summary.name}</p>
              </div>

              <div className="text-sm text-slate-600">
                <p>
                  <span className="font-medium">Stage:</span> {summary.stage}
                </p>
                <p>
                  <span className="font-medium">Latest Run:</span>{" "}
                  {summary.latestRunNumber ?? "None"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Top Bidder
                </p>
                <p className="mt-1 text-sm text-slate-800">
                  {summary.topBidderName ?? "Not available"}
                </p>
                <p className="text-xs text-slate-500">
                  Score: {summary.topBidderScore ?? "N/A"}
                </p>
              </div>

              <div className="rounded-md border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Latest Run Hash
                </p>
                <p className="mt-1 break-all text-xs font-mono text-slate-800">
                  {summary.latestRunHash ?? "No evaluation run recorded yet."}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link
                href={`/public-verification/tender/${encodeURIComponent(
                  summary.tenderId
                )}/run/${summary.latestRunNumber ?? 1}`}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
              >
                Verify Evaluation Run
              </Link>

              <Link
                href={`/public-verification/tender/${encodeURIComponent(
                  summary.tenderId
                )}/result`}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
              >
                Verify Bidder Result
              </Link>

              <Link
                href={`/public-verification/tender/${encodeURIComponent(
                  summary.tenderId
                )}/council-pack`}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
              >
                Verify Council Pack
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
