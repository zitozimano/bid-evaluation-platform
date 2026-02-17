"use client";

interface TenderActionsToolbarProps {
  tenderId: string;
  status: string;
  roles: string[]; // ["SCM", "CFO", "ADMIN", "AUDIT"]
}

export function TenderActionsToolbar({
  tenderId,
  status,
  roles,
}: TenderActionsToolbarProps) {
  const can = (role: string) => roles.includes(role) || roles.includes("ADMIN");

  async function updateStatus(newStatus: string) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tenders/${tenderId}/status/${newStatus}`,
      { method: "POST", credentials: "include" },
    );
    location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2 bg-white border rounded p-3 shadow-sm">
      {/* Edit */}
      {can("SCM") && (
        <a
          href={`/tenders/${tenderId}/edit`}
          className="px-3 py-2 bg-slate-100 text-slate-800 rounded text-sm"
        >
          Edit
        </a>
      )}

      {/* Publish */}
      {status === "DRAFT" && can("SCM") && (
        <button
          onClick={() => updateStatus("PUBLISHED")}
          className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Publish
        </button>
      )}

      {/* Award */}
      {status === "PUBLISHED" && can("CFO") && (
        <button
          onClick={() => updateStatus("AWARDED")}
          className="px-3 py-2 bg-emerald-600 text-white rounded text-sm"
        >
          Award
        </button>
      )}

      {/* Archive */}
      {(status === "PUBLISHED" || status === "AWARDED") &&
        can("CFO") && (
          <button
            onClick={() => updateStatus("ARCHIVED")}
            className="px-3 py-2 bg-slate-600 text-white rounded text-sm"
          >
            Archive
          </button>
        )}

      {/* Read-only roles */}
      {roles.includes("AUDIT") && (
        <span className="text-xs text-slate-500">
          Read‑only access
        </span>
      )}
    </div>
  );
}
