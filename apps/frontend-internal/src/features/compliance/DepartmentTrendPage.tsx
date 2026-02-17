import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDepartmentTrend } from './api';
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

type TrendPoint = {
  timestamp: string;
  complianceScore: number;
  riskScore: number;
  anomalyCount: number;
};

export const DepartmentTrendPage: React.FC = () => {
  const { department } = useParams();
  const [points, setPoints] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentTrend(department);
        setPoints(
          data.map((p: any) => ({
            timestamp: p.timestamp,
            complianceScore: p.complianceScore,
            riskScore: p.riskScore,
            anomalyCount: p.anomalyCount,
          })),
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Loading trend…</div>;
  if (!points.length)
    return (
      <div style={{ padding: 24 }}>
        <h2>Department Trend: {department}</h2>
        <DepartmentNav />
        <p>No trend data available.</p>
      </div>
    );

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Trend: {department}</h2>
      <DepartmentNav />

      <p style={{ color: '#666', marginBottom: 16 }}>
        Compliance and risk over time.
      </p>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={points}>
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
    </div>
  );
};
