import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/apiClient";
import { QRCodeCanvas } from "qrcode.react";

type VerifyResponse = {
  tender: { id: string; number: string; description: string };
  bidder: { id: string; name: string; price: number | null };
  scores: { functionality: number; price: number; bbbee: number; total: number };
  qualifies: boolean;
  hash: string;
  signedToken: string;
  verifiedAt: string;
};

export default function PublicVerifyPage() {
  const router = useRouter();
  const { hash } = router.query;

  const [data, setData] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hash || typeof hash !== "string") return;
    setLoading(true);
    setError(null);

    apiFetch<VerifyResponse>(`/public/verify/${hash}`)
      .then(setData)
      .catch((e) => setError(e.message || "Verification failed"))
      .finally(() => setLoading(false));
  }, [hash]);

  if (!hash) {
    return <div className="p-6 text-sm">Missing verification hash.</div>;
  }

  if (loading) {
    return <div className="p-6 text-sm">Verifying evaluation…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-sm text-red-700">
        Verification failed: {error}
      </div>
    );
  }

  if (!data) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_PUBLIC_VERIFY_URL ||
    "http://localhost:3001/public/verify";
  const tokenUrl =
    process.env.NEXT_PUBLIC_PUBLIC_VERIFY_TOKEN_URL ||
    "http://localhost:3001/public/verify-token";

  const hashLink = `${baseUrl}/${data.hash}`;
  const tokenLink = `${tokenUrl}/${data.signedToken}`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-semibold">
          Bid Evaluation – Public Verification
        </h1>

        <div className="mb-4 text-xs text-slate-500">
          Verified at: {new Date(data.verifiedAt).toLocaleString()}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-3 text-sm">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              Tender
            </div>
            <div className="text-sm font-medium">
              {data.tender.number} – {data.tender.description}
            </div>
          </div>

          <div className="rounded-md border border-slate-200 p-3 text-sm">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              Bidder
            </div>
            <div className="text-sm font-medium">{data.bidder.name}</div>
            <div className="text-xs text-slate-500">
              Price:{" "}
              {data.bidder.price != null
                ? `R ${data.bidder.price.toLocaleString()}`
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4 text-sm">
          <ScoreCard label="Functionality" value={data.scores.functionality} />
          <ScoreCard label="Price" value={data.scores.price} />
          <ScoreCard label="BBBEE" value={data.scores.bbbee} />
          <ScoreCard label="Total" value={data.scores.total} />
        </div>

        <div className="mb-6 rounded-md border border-slate-200 p-3 text-sm">
          <div className="mb-1 text-xs font-semibold text-slate-500">
            Qualification
          </div>
          <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              data.qualifies
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.qualifies ? "QUALIFIES" : "DOES NOT QUALIFY"}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-3 text-sm">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              Verification link (hash)
            </div>
            <div className="mb-2 break-all text-xs text-slate-600">
              {hashLink}
            </div>
            <QRCodeCanvas value={hashLink} size={160} />
          </div>

          <div className="rounded-md border border-slate-200 p-3 text-sm">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              Signed verification token
            </div>
            <div className="mb-2 break-all text-xs text-slate-600">
              {data.signedToken}
            </div>
            <QRCodeCanvas value={tokenLink} size={160} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <div className="mb-1 text-xs font-semibold text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value.toFixed(2)}</div>
    </div>
  );
}
