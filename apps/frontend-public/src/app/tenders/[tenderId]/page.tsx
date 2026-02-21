import TrustBadge from "@/components/TrustBadge";
import VerifyButton from "@/components/VerifyButton";

export default async function TenderPage({ params }: any) {
  const { tenderId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/tenders/${tenderId}`,
    { cache: "no-store" }
  );

  const tender = await res.json();

  if (tender.notFound) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold">Tender Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <TrustBadge />

      <h1 className="text-3xl font-bold mb-4">{tender.name}</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Tender Number:</strong> {tender.number}</p>
        <p><strong>Department:</strong> {tender.department?.name ?? "N/A"}</p>
        <p><strong>Category:</strong> {tender.category?.name ?? "N/A"}</p>
        <p><strong>Status:</strong> {tender.stage}</p>
        <p><strong>Description:</strong> {tender.description ?? "No description provided."}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Bidders</h2>
        <div className="border rounded-lg divide-y">
          {tender.bidders.map((b: any) => (
            <div key={b.id} className="p-4 flex justify-between">
              <span>{b.name}</span>
              <span className="font-semibold">
                {b.disqualified ? "Disqualified" : `R ${b.price?.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <VerifyButton tenderId={tenderId} />
      </div>
    </div>
  );
}
