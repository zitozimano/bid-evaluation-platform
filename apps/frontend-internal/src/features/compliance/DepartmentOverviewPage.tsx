import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchDepartmentTrend,
  fetchDepartmentForecast,
  fetchDepartmentKpis,
  fetchDepartmentNarrative,
} from './api';
import { DepartmentNav } from './DepartmentNav';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export const DepartmentOverviewPage: React.FC = () => {
  const { department } = useParams();

  const [trend, setTrend] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any | null>(null);
  const [kpis, setKpis] = useState<any | null>(null);
  const [narrative, setNarrative] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const [t, f, k, n] = await Promise.all([
          fetchDepartmentTrend(department),
          fetchDepartmentForecast(department),
          fetchDepartmentKpis(department),
          fetchDepartmentNarrative(department),
        ]);
        setTrend(t);
        setForecast(f);
        setKpis(k);
        setNarrative(n.narrative);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Loading overview…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Overview: {department}</h2>
      <DepartmentNav />

      <h3>Performance Trend</h3>
      {trend.length ? (
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={trend}>
              <CartesianGrid stroke="#eee" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(t) => new Date(t).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="complianceScore"
                stroke="#007bff"
                name="Compliance"
              />
              <Line
                type="monotone"
                dataKey="riskScore"
                stroke="#dc3545"
                name="Risk"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No trend data.</p>
      )}

      <h3 style={{ marginTop: 24 }}>Forecast</h3>
      {forecast ? (
        <>
          <p>Trend: {forecast.trend}</p>
          <p>7‑day forecast: {forecast.forecast}</p>
        </>
      ) : (
        <p>No forecast available.</p>
      )}

      <h3 style={{ marginTop: 24 }}>KPIs</h3>
      {kpis ? (
        <ul>
          <li>Total tenders: {kpis.tenderCount}</li>
          <li>Missing AGSA packs: {kpis.missingAgsa}</li>
          <li>Missing ranking: {kpis.missingRanking}</li>
          <li>Missing functionality scoring: {kpis.missingFunctionality}</li>
        </ul>
      ) : (
        <p>No KPI data.</p>
      )}

      <h3 style={{ marginTop: 24 }}>Narrative Summary</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{narrative}</p>
    </div>
  );
};
