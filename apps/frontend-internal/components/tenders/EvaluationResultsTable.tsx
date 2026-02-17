interface EvaluationResultsTableProps {
  results: {
    id: string;
    bidderName: string;
    functionalityScore: number | null;
    priceScore: number | null;
    bbbeePoints: number | null;
    totalScore: number | null;
    currentStage: string | null;
  }[];
}

export function EvaluationResultsTable({ results }: EvaluationResultsTableProps) {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">Evaluation Results</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Bidder</th>
            <th>Func</th>
            <th>Price</th>
            <th>BBBEE</th>
            <th>Total</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="border-b">
              <td>{r.bidderName}</td>
              <td>{r.functionalityScore ?? "-"}</td>
              <td>{r.priceScore ?? "-"}</td>
              <td>{r.bbbeePoints ?? "-"}</td>
              <td>{r.totalScore ?? "-"}</td>
              <td>{r.currentStage ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
