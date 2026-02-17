interface LogDetail {
  id: string;
  createdAt: string;
  role: string;
  endpoint: string;
  ip: string | null;
  userAgent: string | null;
  userId: string;
  notFound?: boolean;
}

async function fetchLog(id: string): Promise<LogDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/verification-logs/${id}`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load log");
  return res.json();
}

export default async function VerificationLogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const log = await fetchLog(params.id);

  if (log.notFound) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-sm text-red-600">Log not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold text-slate-800">
          Verification Log Detail
        </h1>

        <div className="bg-white border rounded p-4 text-sm space-y-2">
          <div>
            <span className="font-semibold">ID:</span> {log.id}
          </div>
          <div>
            <span className="font-semibold">Time:</span>{" "}
            {new Date(log.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">User:</span> {log.userId}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {log.role}
          </div>
          <div>
            <span className="font-semibold">Endpoint:</span> {log.endpoint}
          </div>
          <div>
            <span className="font-semibold">IP:</span> {log.ip ?? "-"}
          </div>
          <div>
            <span className="font-semibold">User Agent:</span>{" "}
            {log.userAgent ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
