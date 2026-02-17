import { RequireRole } from "../../components/RequireRole";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useEvaluationResults } from "../../hooks/useEvaluation";

export default function AuditDashboardPage() {
  const { user } = useAuth();
  const [tenderId, setTenderId] = useState<string>("");

  const { data: results } = useEvaluationResults(tenderId || null);

  return (
    <RequireRole role="AUDIT">
      <div>
        <h1>Audit Dashboard</h1>
        <p>Welcome, {user?.email}</p>

        <section>
          <h2>Select Tender</h2>
          <input
            placeholder="Enter Tender ID"
            value={tenderId}
            onChange={(e) => setTenderId(e.target.value)}
          />
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Evaluation Results (for audit)</h2>
          {results && results.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Bidder</th>
                  <th>Total</th>
                  <th>Qualifies</th>
                  <th>Exceptions</th>
                  <th>SLA Breached</th>
                  <th>Stage</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td>{r.bidderId}</td>
                    <td>{r.totalScore}</td>
                    <td>{r.qualifies ? "Yes" : "No"}</td>
                    <td>{r.exceptionsCount}</td>
                    <td>{r.slaBreached ? "Yes" : "No"}</td>
                    <td>{r.currentStage ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results loaded.</p>
          )}
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Notes</h2>
          <p>
            This view is designed for Internal Audit / AGSA to trace outcomes,
            exceptions, and SLA breaches.
          </p>
        </section>
      </div>
    </RequireRole>
  );
}
