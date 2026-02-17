import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDepartmentKpis } from './api';
import { DepartmentNav } from './DepartmentNav';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

type DeptKpis = {
  department: string;
  tenderCount: number;
  missingAgsa: number;
  missingRanking: number;
  missingFunctionality: number;
};

export const DepartmentKpisPage: React.FC = () => {
  const { department } = useParams();
  const [kpis, setKpis] = useState<DeptKpis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchDepartmentKpis(department);
        setKpis(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Loading KPIs…</div>;
  if (!kpis)
    return (
      <div style={{ padding: 24 }}>
        <h2>Department KPIs: {department}</h2>
        <DepartmentNav />
        <p>No KPI data available.</p>
      </div>
    );

  const radarData = [
    { metric: 'Missing AGSA', value: kpis.missingAgsa },
    { metric: 'Missing Ranking', value: kpis.missingRanking },
    { metric: 'Missing Functionality', value: kpis.missingFunctionality },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Department KPIs: {kpis.department}</h2>
      <DepartmentNav />

      <ul>
        <li>Total tenders: {kpis.tenderCount}</li>
        <li>Tenders missing AGSA packs: {kpis.missingAgsa}</li>
        <li>Tenders missing ranking: {kpis.missingRanking}</li>
        <li>
          Tenders with missing functionality scoring: {kpis.missingFunctionality}
        </li>
      </ul>

      <h3 style={{ marginTop: 24 }}>Governance Gaps Radar</h3>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar
              name="Gaps"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
