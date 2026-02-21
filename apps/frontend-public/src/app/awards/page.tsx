import Link from "next/link";
import TrustBadge from "@/components/TrustBadge";

export default async function AwardsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/tenders`,
    { cache: "no-store" }
  );

  const tenders = res.ok ? await res.json() : [];

  const awarded = tenders.filter((t: any) => t.stage === "AWARDED");

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <TrustBadge />

      <h1 className="text-3xl font-bold mb-6">Awarded Tenders</h1>

      {awarded.length === 0 ? (
        <p className="text-gray-600">No awarded tenders available.</p>
      ) : (
        <div className="border rounded-lg divide-y">
          {awarded.map((t: any) => (
            <Link
              key={t.id}
              href={`/tenders/${t.id}`}
              className="block p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{t.category ?? "Uncategorized"}</p>
                  <p className="text-sm font-semibold text-green-700">
                    {t.stage}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
