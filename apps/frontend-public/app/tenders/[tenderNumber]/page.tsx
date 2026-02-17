interface TenderDetail {
  tenderNumber: string;
  description: string;
  category: string | null;
  createdAt: string;
  documents: {
    runNumber: number;
    fileUrl: string;
    hash: string;
    createdAt: string;
  }[];
  results: {
    bidderId: string;
    bidderName: string;
    totalScore: number;
    qualifies: boolean;
  }[];
  winner: {
    bidderId: string;
    bidderName: string;
    totalScore: number;
  } | null;
}

async function fetchTenderDetail(tenderNumber: string): Promise<TenderDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/tenders/${encodeURIComponent(
      tenderNumber,
    )}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tender");
  return res.json();
}

export default async function TenderDetailPage({
  params,
}: {
  params: { tenderNumber: string };
}) {
  const data = await fetchTenderDetail(params.tenderNumber);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Tender {data.tenderNumber}
          </h1>
          <p className="text-sm text-slate-600">{data.description}</p>
          <p className="text-xs text-slate-500">
            Category: {data.category ?? "-"} •{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>

        {data.winner && (
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Awarded Bidder
            </h2>
            <p className="text-sm text-slate-700">
              {data.winner.bidderName} ({data.winner.bidderId}) – Score:{" "}
              {data.winner.totalScore}
            </p>
          </div>
        )}

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Evaluation Documents
          </h2>
          <ul className="text-sm text-slate-700 mt-2 space-y-1">
            {data.documents.map((d) => (
              <li key={d.runNumber}>
                Run {d.runNumber} –{" "}
                <a
                  href={d.fileUrl}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  Download
                </a>{" "}
                • Hash: <span className="font-mono text-xs">{d.hash}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded p-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Bidder Scores
          </h2>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="text-left px-2 py-1">Bidder</th>
                <th className="text-left px-2 py-1">Score</th>
                <th className="text-left px-2 py-1">Qualifies</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((r) => (
                <tr key={r.bidderId} className="border-b">
                  <td className="px-2 py-1">{r.bidderName}</td>
                  <td className="px-2 py-1">{r.totalScore}</td>
                  <td className="px-2 py-1">
                    {r.qualifies ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
