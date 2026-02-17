import React, { useEffect, useMemo, useState } from 'react';
import {
  fetchDepartmentComplianceScores,
  fetchDepartmentRiskHeatmap,
  getDepartmentComparisonCsvUrl,
  getDepartmentComparisonPdfUrl,
  getCouncilPackPdfUrl,
} from './api';

export const DepartmentComparisonPage: React.FC = () => {
  const [compliance, setCompliance] = useState<any[]>([]);
  const [risk, setRisk] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortKey, setSortKey] = useState<'department' | 'tenderCount' | 'avgComplianceScore' | 'riskScore'>('avgComplianceScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [c, r] = await Promise.all([
          fetchDepartmentComplianceScores(),
          fetchDepartmentRiskHeatmap(),
        ]);
        setCompliance(c);
        setRisk(r);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rows = useMemo(() => {
    const riskByDept: Record<string, any> = {};
    for (const r of risk) riskByDept[r.department] = r;
    return compliance.map((c) => ({
      ...c,
      ...(riskByDept[c.department] || {}),
    }));
  }, [compliance, risk]);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'department') {
        return a.department.localeCompare(b.department) * dir;
      }
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const setSort = (key: typeof sortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading department comparison…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Comparison Dashboard</h2>
      <p style={{ color: '#666', marginBottom: 8 }}>
        Side‑by‑side comparison of departments by compliance, risk, and governance gaps.
      </p>

      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <a href={getDepartmentComparisonCsvUrl()}>
          <button>Export CSV</button>
        </a>
        <a href={getDepartmentComparisonPdfUrl()}>
          <button>Export Comparison PDF</button>
        </a>
        <a href={getCouncilPackPdfUrl()}>
          <button>Council / AGSA Pack PDF</button>
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => setSort('department')}>Department</th>
            <th onClick={() => setSort('tenderCount')}>Tenders</th>
            <th onClick={() => setSort('avgComplianceScore')}>Avg Compliance</th>
            <th>Min</th>
            <th>Max</th>
            <th onClick={() => setSort('riskScore')}>Risk</th>
            <th>Anomalies</th>
            <th>Missing AGSA</th>
            <th>Missing Ranking</th>
            <th>Missing Functionality</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((d) => (
            <tr key={d.department}>
              <td>{d.department}</td>
              <td>{d.tenderCount}</td>
              <td>{d.avgComplianceScore.toFixed(1)}</td>
              <td>{d.minComplianceScore ?? '—'}</td>
              <td>{d.maxComplianceScore ?? '—'}</td>
              <td>{d.riskScore !== undefined && d.riskScore !== null ? d.riskScore.toFixed(1) : '—'}</td>
              <td>{d.anomalyCount ?? '—'}</td>
              <td>{d.missingAgsa ?? '—'}</td>
              <td>{d.missingRanking ?? '—'}</td>
              <td>{d.missingFunctionality ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
