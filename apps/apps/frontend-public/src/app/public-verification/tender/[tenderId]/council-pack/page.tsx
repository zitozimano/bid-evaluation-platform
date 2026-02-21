import { apiGet } from "@/lib/api";
import type { CouncilPackResponse } from "@/lib/types";
import Link from "next/link";

interface Props {
  params: { tenderId: string };
}

export default async function CouncilPackVerificationPage({ params }: Props) {
  const { tenderId } = params;

  let data: CouncilPackResponse | null = null;
  let error: string | null = null;

  try {
    data = await apiGet<CouncilPackResponse>(
      `/public/tender/${encodeURIComponent(tenderId)}/council-pack`
    );
  } catch (e: any) {
    error = e.message || "Failed to verify council pack.";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Council Pack Verification
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

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {data && (
          <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                ✔
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Council Pack Verified
                </p>
                <p className="text-xs text-slate-600">
                  This Council Pack is authentic and matches the official evaluation run.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 p-4 text-sm text-slate-700">
                <p><span className="font-medium">Tender ID:</span> {data.tenderId}</p>
                <p><span className="font-medium">Evaluation Run:</span> {data.runNumber}</p>
                {data.generatedAt && (
                  <p><span className="font-medium">Generated At:</span> {data.generatedAt}</p>
                )}
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

            {data.url && (
              <div className="mt-4">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700"
                >
                  Open Council Pack PDF
                </a>
              </div>
            )}

            <details className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
              <summary className="cursor-pointer text-xs font-medium text-slate-800">
                View Verification Certificate (JSON)
              </summary>
              <pre className="mt-2 overflow-x-auto rounded bg-slate-900 p-3 text-[11px] text-slate-100">
{JSON.stringify(
  {
    tenderId: data.tenderId,
    runNumber: data.runNumber,
    runHash: data.runHash,
    generatedAt: data.generatedAt,
    url: data.url,
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
