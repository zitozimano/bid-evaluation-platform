"use client";

const matrix = [
  { action: "Create Tender", SCM: true, CFO: false, ADMIN: true, AUDIT: false },
  { action: "Edit Tender", SCM: true, CFO: false, ADMIN: true, AUDIT: false },
  { action: "Publish Tender", SCM: true, CFO: false, ADMIN: true, AUDIT: false },
  { action: "Award Tender", SCM: false, CFO: true, ADMIN: true, AUDIT: false },
  { action: "Archive Tender", SCM: false, CFO: true, ADMIN: true, AUDIT: false },
  { action: "View Insights", SCM: true, CFO: true, ADMIN: true, AUDIT: true },
  { action: "View Activity Log", SCM: true, CFO: true, ADMIN: true, AUDIT: true },
];

export default function TenderPermissionsMatrixPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Tender Permissions Matrix
      </h1>

      <table className="min-w-full bg-white border rounded shadow-sm text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 text-left">Action</th>
            <th className="px-3 py-2">SCM</th>
            <th className="px-3 py-2">CFO</th>
            <th className="px-3 py-2">ADMIN</th>
            <th className="px-3 py-2">AUDIT</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row) => (
            <tr key={row.action} className="border-t">
              <td className="px-3 py-2">{row.action}</td>
              <td className="px-3 py-2 text-center">
                {row.SCM ? "✔" : "—"}
              </td>
              <td className="px-3 py-2 text-center">
                {row.CFO ? "✔" : "—"}
              </td>
              <td className="px-3 py-2 text-center">
                {row.ADMIN ? "✔" : "—"}
              </td>
              <td className="px-3 py-2 text-center">
                {row.AUDIT ? "✔" : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
