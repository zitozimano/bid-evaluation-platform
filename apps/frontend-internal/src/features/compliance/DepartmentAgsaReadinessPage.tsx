import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchDepartmentKpis,
  fetchDepartmentRiskHeatmap,
  fetchDepartmentTrend,
} from './api';
import { DepartmentNav } from './DepartmentNav';

export const DepartmentAgsaReadinessPage: React.FC = () => {
  const { department } = useParams();

  const [kpis, setKpis] = useState<any | null>(null);
  const [risk, setRisk] = useState<any | null>(null);
  const [trend, setTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const [k, riskHeatmap, t] = await Promise.all([
          fetchDepartmentKpis(department),
          fetchDepartmentRiskHeatmap(),
          fetchDepartmentTrend(department),
        ]);
        setKpis(k);
        setRisk(riskHeatmap.find((x: any) => x.department === department) || null);
        setTrend(t);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Loading AGSA readiness…</div>;
  if (!kpis || !risk)
    return (
      <div style={{ padding: 24 }}>
        <h2>AGSA Readiness: {department}</h2>
        <DepartmentNav />
        <p>Insufficient data for AGSA readiness.</p>
      </div>
    );

  const latest = trend.length ? trend[trend.length - 1] : null;
  const latestCompliance = latest ? latest.complianceScore : null;

  const readiness =
    kpis.missingAgsa === 0 &&
    kpis.missingRanking === 0 &&
    kpis.missingFunctionality === 0 &&
    risk.riskScore < 40 &&
    (latestCompliance === null || latestCompliance >= 70);

  return (
    <div style={{ padding: 24 }}>
      <h2>AGSA Readiness: {department}</h2>
      <DepartmentNav />

      <h3>Status: {readiness ? 'READY' : 'NOT READY'}</h3>

      <ul>
        <li>Missing AGSA packs: {kpis.missingAgsa}</li>
        <li>Missing ranking: {kpis.missingRanking}</li>
        <li>Missing functionality scoring: {kpis.missingFunctionality}</li>
        <li>Risk score: {risk.riskScore.toFixed(1)}</li>
        <li>
          Latest compliance:{' '}
          {latestCompliance !== null ? latestCompliance.toFixed(1) : 'N/A'}
        </li>
      </ul>
    </div>
  );
};
