interface TenderSummaryProps {
  tender: {
    number: string;
    description: string;
    status: string;
    createdAt: string;
  };
}

export function TenderSummary({ tender }: TenderSummaryProps) {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">Tender Summary</h2>
      <p className="text-sm text-gray-700">{tender.description}</p>
      <div className="mt-2 text-sm text-gray-600">
        <div>Status: {tender.status}</div>
        <div>Created: {new Date(tender.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
