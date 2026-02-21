import TrustBadge from "@/components/TrustBadge";

export default async function CouncilPacksPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/tenders`,
    { cache: "no-store" }
  );

  const tenders = res.ok ? await res.json() : [];

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <TrustBadge />

      <h1 className="text-3xl font-bold mb-6">Council Packs</h1>

      <div className="border rounded-lg divide-y">
        {tenders.map((t: any) => (
          <div key={t.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-600">{t.number}</p>
            </div>
            <a
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/council-pack/${t.id}`}
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Download Council Pack
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
