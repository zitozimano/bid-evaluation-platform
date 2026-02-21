import Link from "next/link";
import TrustBadge from "@/components/TrustBadge";

async function fetchData(searchParams: any) {
  const query = new URLSearchParams();

  if (searchParams.year) query.set("year", searchParams.year);
  if (searchParams.department) query.set("department", searchParams.department);
  if (searchParams.category) query.set("category", searchParams.category);

  const [tendersRes, departmentsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/tenders?${query}`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/departments`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/categories`, { cache: "no-store" }),
  ]);

  return {
    tenders: tendersRes.ok ? await tendersRes.json() : [],
    departments: departmentsRes.ok ? await departmentsRes.json() : [],
    categories: categoriesRes.ok ? await categoriesRes.json() : [],
  };
}

export default async function TendersDashboard({ searchParams }: any) {
  const { tenders, departments, categories } = await fetchData(searchParams);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6">
      <TrustBadge />

      <h1 className="text-3xl font-bold mb-4">Public Tender Transparency Portal</h1>

      {/* Filters */}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Year</label>
          <input
            name="year"
            defaultValue={searchParams.year ?? ""}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="2026"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Department</label>
          <select
            name="department"
            defaultValue={searchParams.department ?? ""}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {departments.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Category</label>
          <select
            name="category"
            defaultValue={searchParams.category ?? ""}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Tender List */}
      <div className="border rounded-lg divide-y">
        {tenders.map((t: any) => (
          <Link
            key={t.id}
            href={`/tenders/${t.id}`}
            className="block p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-600">{t.number}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right text-sm space-y-1">
                <p>{t.category ?? "Uncategorized"}</p>
                <p>{t.department ?? "No Department"}</p>
                <p className="font-semibold">{t.stage}</p>

                {t.award && (
                  <p className="text-xs text-green-700">
                    Awarded to {t.award.bidderName} (R{" "}
                    {t.award.price?.toLocaleString()})
                  </p>
                )}

                {t.compliance?.averageRate !== null && (
                  <p className="text-xs text-gray-700">
                    Avg Compliance: {(t.compliance.averageRate * 100).toFixed(0)}%
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
