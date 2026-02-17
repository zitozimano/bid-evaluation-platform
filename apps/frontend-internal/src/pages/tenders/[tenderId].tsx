import { useRouter } from "next/router";
import { useAnalyticsSummary, useBidderPerformance } from "../../hooks/useAnalytics";
import { useEvaluationResults } from "../../hooks/useEvaluation";
import { useBidders } from "../../hooks/useBidders";
import { useAuth } from "../../context/AuthContext";

export default function TenderDashboardPage() {
  const router = useRouter();
  const { tenderId } = router.query as { tenderId?: string };
  const { user } = useAuth();

  const { data: summary } = useAnalyticsSummary(tenderId || null);
  const { data: performance } = useBidderPerformance(tenderId || null);
  const { data: results } = useEvaluationResults(tenderId || null);
  const { data: bidders } = useBidders(tenderId || null);

  if (!tenderId) return <div>Loading tender...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Tender Dashboard: {tenderId}</h1>
      <p>Logged in as: {user?.email} ({user?.role})</p>

      <section>
        <h2>Analytics Summary</h2>
        {summary ? (
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        ) : (
          <p>No analytics yet.</p>
        )}
      </section>

      <section>
        <h2>Bidder Performance</h2>
        {performance ? (
          <ul>
            {performance.map((p) => (
              <li key={p.bidderId}>
                {p.name} — Total: {p.totalScore}
              </li>
            ))}
          </ul>
        ) : (
          <p>No performance data.</p>
        )}
      </section>

      <section>
        <h2>Evaluation Results</h2>
        {results ? (
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

      <section>
        <h2>Bidders</h2>
        {bidders ? (
          <ul>
            {bidders.map((b) => (
              <li
                key={b.id}
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => router.push(`/bidders/${b.id}`)}
              >
                {b.name} — {b.price ?? "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bidders yet.</p>
        )}
      </section>
    </div>
  );
}
