import React, { useEffect, useState } from 'react';
import { fetchExecutiveDashboard } from './api';

type ExecutiveDashboardResponse = {
  summary: any;
  departments: any[];
  topRiskyDepartments: any[];
  topNonCompliantDepartments: any[];
  agsaReadiness: { ready: number; notReady: number };
};

export const ExecutiveDashboardPage: React.FC = () => {
  const [data, setData] = useState<ExecutiveDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchExecutiveDashboard();
        setData(res);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading executive dashboard…</div>;
  if (!data) return <div style={{ padding: 24 }}>No data available.</div>;

  const { summary, topRiskyDepartments, topNonCompliantDepartments, agsaReadiness } = data;

  return (
    <div style={{ padding: 24 }}>
      <h2>Executive Dashboard</h2>
      <p style={{ color: '#666', marginBottom: 16 }}>
        High‑level view for CFO, MM, Council, and AGSA.
      </p>

      <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ border: '1px solid #ddd', padding: 12, minWidth: 180 }}>
          <h4>Total Tenders</h4>
          <p style={{ fontSize: 24 }}>{summary.totalTenders ?? 'N/A'}</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: 12, minWidth: 180 }}>
          <h4>Avg Compliance</h4>
          <p style={{ fontSize: 24 }}>{summary.avgComplianceScore ?? 'N/A'}</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: 12, minWidth: 180 }}>
          <h4>Avg Risk</h4>
          <p style={{ fontSize: 24 }}>{summary.avgRiskScore ?? 'N/A'}</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: 12, minWidth: 220 }}>
          <h4>AGSA Readiness</h4>
          <p>
            Ready: <strong>{agsaReadiness.ready}</strong>
          </p>
          <p>
            Not Ready: <strong>{agsaReadiness.notReady}</strong>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3>Top Risky Departments</h3>
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Risk</th>
                <th>Anomalies</th>
              </tr>
            </thead>
            <tbody>
              {topRiskyDepartments.map((d) => (
                <tr key={d.department}>
                  <td>{d.department}</td>
                  <td>{d.riskScore?.toFixed(1) ?? '—'}</td>
                  <td>{d.anomalyCount ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          <h3>Lowest Compliance Departments</h3>
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Avg Compliance</th>
                <th>Tenders</th>
              </tr>
            </thead>
            <tbody>
              {topNonCompliantDepartments.map((d) => (
                <tr key={d.department}>
                  <td>{d.department}</td>
                  <td>{d.avgComplianceScore.toFixed(1)}</td>
                  <td>{d.tenderCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
