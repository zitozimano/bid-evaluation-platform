import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDepartmentRiskHeatmap } from './api';

type DeptRiskRow = {
  department: string;
  riskScore: number;
  anomalyCount: number;
  missingAgsa: number;
  missingRanking: number;
  missingFunctionality: number;
};

export const DepartmentRiskHeatmapPage: React.FC = () => {
  const [rows, setRows] = useState<DeptRiskRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentRiskHeatmap();
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading department risk…</div>;
  if (!rows.length) return <div style={{ padding: 24 }}>No department risk data.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Risk Heatmap</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Risk, anomalies, and governance gaps per department. Click a row to drill down.
      </p>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Risk Score</th>
            <th>Anomalies</th>
            <th>Missing AGSA</th>
            <th>Missing Ranking</th>
            <th>Missing Functionality</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr
              key={d.department}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(`/departments/${encodeURIComponent(d.department)}`)
              }
            >
              <td>{d.department}</td>
              <td>{d.riskScore.toFixed(1)}</td>
              <td>{d.anomalyCount}</td>
              <td>{d.missingAgsa}</td>
              <td>{d.missingRanking}</td>
              <td>{d.missingFunctionality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
