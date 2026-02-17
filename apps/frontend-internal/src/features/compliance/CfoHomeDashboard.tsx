import React, { useEffect, useState } from 'react';
import { fetchComplianceSummary, fetchHealthScores } from './api';
import { RiskHeatmap } from './RiskHeatmap';

export const CfoHomeDashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [health, setHealth] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [s, h] = await Promise.all([
        fetchComplianceSummary(),
        fetchHealthScores(),
      ]);
      setSummary(s);
      setHealth(h);
    })();
  }, []);

  if (!summary) return <div>Loading CFO dashboard…</div>;

  const totalTenders = summary.lastAgsaPackDates.length;
  const missingAgsaCount = summary.missingAgsaPacks.length;
  const avgHealth =
    health.length > 0
      ? Math.round(
          health.reduce((acc, h) => acc + h.healthScore, 0) / health.length,
        )
      : 0;

  return (
    <div style={{ padding: 24 }}>
      <h2>CFO Home Dashboard</h2>

      <section style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>Total Tenders</div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {totalTenders}
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>
            Tenders Missing AGSA Pack
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: missingAgsaCount > 0 ? '#dc3545' : '#28a745',
            }}
          >
            {missingAgsaCount}
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>
            Average Tender Health
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: avgHealth < 60 ? '#dc3545' : '#28a745',
            }}
          >
            {avgHealth}%
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>Anomaly Signals</div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: summary.anomalies.length ? '#dc3545' : '#28a745',
            }}
          >
            {summary.anomalies.length}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3>Tender Health Scores</h3>
        <table>
          <thead>
            <tr>
              <th>Tender</th>
              <th>Health</th>
              <th>Risk</th>
              <th>AGSA Pack</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {health.map((h: any) => (
              <tr key={h.tenderId}>
                <td>{h.title}</td>
                <td>{h.healthScore}%</td>
                <td>{h.riskScore}</td>
                <td>{h.hasAgsa ? 'Yes' : 'No'}</td>
                <td>{h.hasRanking ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <RiskHeatmap />
      </section>
    </div>
  );
};
