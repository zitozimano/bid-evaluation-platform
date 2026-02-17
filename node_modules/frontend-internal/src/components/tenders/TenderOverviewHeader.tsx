"use client";

interface TenderOverviewHeaderProps {
  tender: {
    id: string;
    number: string;
    description: string;
    status: string;
    createdAt: string;
  };
}

export function TenderOverviewHeader({ tender }: TenderOverviewHeaderProps) {
  return (
    <div className="bg-white border rounded p-4 shadow-sm space-y-1">
      <h1 className="text-2xl font-bold text-slate-800">
        {tender.number}
      </h1>
      <p className="text-sm text-slate-600">{tender.description}</p>
      <p className="text-xs text-slate-500">
        Status: {tender.status} • Created{" "}
        {new Date(tender.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
