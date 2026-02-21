import TrustBadge from "@/components/TrustBadge";

async function fetchCompliance(searchParams: {
  year?: string;
  department?: string;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (searchParams.year) query.set("year", searchParams.year);
  if (searchParams.department) query.set("department", searchParams.department);
  if (searchParams.category) query.set("category", searchParams.category);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/compliance?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

interface Props {
  searchParams: {
    year?: string;
    department?: string;
    category?: string;
  };
}

export default async function ComplianceDashboard({ searchParams }: Props) {
  const data = await fetchCompliance(searchParams);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <TrustBadge />

      <h1 className="text-3xl font-bold mb-4">Public Compliance Dashboard</h1>

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
          <input
            name="department"
            defaultValue={searchParams.department ?? ""}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="e.g. Finance"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Category</label>
          <input
            name="category"
            defaultValue={searchParams.category ?? ""}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="e.g. Infrastructure"
          />
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

      {!data ? (
        <p className="text-gray-600">No data available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-sm text-gray-600">Total Tenders</p>
            <p className="text-2xl font-bold">{data.totalTenders}</p>
          </div>

          <div className="p-4 border rounded bg-gray-50">
            <p className="text-sm text-gray-600">Average Compliance Rate</p>
            <p className="text-2xl font-bold">
              {data.averageComplianceRate !== null
                ? `${(data.averageComplianceRate * 100).toFixed(0)}%`
                : "N/A"}
            </p>
          </div>

          {Object.entries(data.byStage || {}).map(([stage, count]) => (
            <div key={stage} className="p-4 border rounded bg-gray-50">
              <p className="text-sm text-gray-600">{stage}</p>
              <p className="text-2xl font-bold">{count as number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
