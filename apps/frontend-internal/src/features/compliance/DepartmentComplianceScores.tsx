import React, { useEffect, useState } from 'react';
import { fetchDepartmentComplianceScores } from './api';

type DepartmentComplianceRow = {
  department: string;
  tenderCount: number;
  avgComplianceScore: number;
  minComplianceScore: number | null;
  maxComplianceScore: number | null;
};

export const DepartmentComplianceScores: React.FC = () => {
  const [rows, setRows] = useState<DepartmentComplianceRow[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading department compliance…</div>;
  if (!rows.length) return <div>No department compliance data.</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Per‑Department Procurement Compliance</h3>
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
          {rows.map((r) => (
            <tr key={r.department}>
              <td>{r.department}</td>
              <td>{r.tenderCount}</td>
              <td>{r.avgComplianceScore}</td>
              <td>{r.minComplianceScore ?? '—'}</td>
              <td>{r.maxComplianceScore ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
