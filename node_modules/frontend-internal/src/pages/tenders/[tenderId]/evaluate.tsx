import { useRouter } from "next/router";
import { useRunEvaluation, useEvaluationResults } from "../../../hooks/useEvaluation";

export default function TenderEvaluatePage() {
  const router = useRouter();
  const { tenderId } = router.query as { tenderId?: string };

  const { run, running, error } = useRunEvaluation(tenderId || null);
  const { data: results } = useEvaluationResults(tenderId || null);

  if (!tenderId) return <div>Loading tender...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Run Evaluation: {tenderId}</h1>

      <button onClick={run} disabled={running}>
        {running ? "Running..." : "Run Evaluation"}
      </button>

      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <section>
        <h2>Latest Results</h2>
        {results && results.length > 0 ? (
          <ul>
            {results.map((r) => (
              <li key={r.id}>
                Bidder {r.bidderId} — Total: {r.totalScore}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results yet.</p>
        )}
      </section>
    </div>
  );
}
