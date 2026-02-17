import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDepartmentComplianceScores } from './api';

type DepartmentRow = {
  department: string;
  tenderCount: number;
  avgComplianceScore: number;
  minComplianceScore: number | null;
  maxComplianceScore: number | null;
};

export const DepartmentPerformanceDashboard: React.FC = () => {
  const [rows, setRows] = useState<DepartmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentComplianceScores();
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading departments…</div>;
  if (!rows.length)
    return <div style={{ padding: 24 }}>No department compliance data.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Performance Dashboard</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Compliance performance per department. Click a row to drill down into tenders.
      </p>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Tenders</th>
            <th>Avg Compliance</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr
              key={d.department}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/departments/${encodeURIComponent(d.department)}`)}
            >
              <td>{d.department}</td>
              <td>{d.tenderCount}</td>
              <td>{d.avgComplianceScore}</td>
              <td>{d.minComplianceScore ?? '—'}</td>
              <td>{d.maxComplianceScore ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
