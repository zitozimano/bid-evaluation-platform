import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDepartmentTenders } from './api';
import { DepartmentNav } from './DepartmentNav';

export const DepartmentDetailPage: React.FC = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentTenders(department!);
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading department tenders…</div>;
  }

  if (!rows.length) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Department: {department}</h2>
        <DepartmentNav />
        <p>No tenders found for this department.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Department: {department}</h2>
      <DepartmentNav />
      <p style={{ color: '#666', marginBottom: 24 }}>
        All tenders for this department with compliance, risk, anomalies, and AGSA status.
      </p>

      <table>
        <thead>
          <tr>
            <th>Tender</th>
            <th>Status</th>
            <th>Compliance</th>
            <th>Risk</th>
            <th>Anomalies</th>
            <th>AGSA</th>
            <th>Ranking</th>
            <th>Functionality</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr
              key={t.tenderId}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/tenders/${t.tenderId}/timeline`)}
            >
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.complianceScore}</td>
              <td>{t.riskScore}</td>
              <td>{t.anomalyCount}</td>
              <td>{t.hasAgsa ? 'Yes' : 'No'}</td>
              <td>{t.hasRanking ? 'Yes' : 'No'}</td>
              <td>{t.missingFunctionality ? 'Missing' : 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
