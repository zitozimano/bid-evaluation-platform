export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-slate-50 mb-4">
        Verification Portal
      </h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Use this portal to verify evaluation packs, reports, and documents issued
        by the Bid Evaluation Platform. Enter a verification hash or scan a QR code.
      </p>

      <div className="flex flex-wrap gap-4">
        <a
          href="/verify"
          className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
        >
          Verify by Hash
        </a>
        <a
          href="/verify/scan"
          className="inline-flex items-center justify-center rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-emerald-400"
        >
          Scan QR Code
        </a>
      </div>
    </div>
  );
}
