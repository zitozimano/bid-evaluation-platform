import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DepartmentNav: React.FC = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  if (!department) return null;

  const base = `/departments/${encodeURIComponent(department)}`;

  return (
    <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={() => navigate(base)}>Drill‑down</button>
      <button onClick={() => navigate(`${base}/overview`)}>Overview</button>
      <button onClick={() => navigate(`${base}/trend`)}>Trend</button>
      <button onClick={() => navigate(`${base}/forecast`)}>Forecast</button>
      <button onClick={() => navigate(`${base}/kpis`)}>KPIs</button>
      <button onClick={() => navigate(`${base}/narrative`)}>Narrative</button>
      <button onClick={() => navigate(`${base}/agsa-readiness`)}>AGSA Readiness</button>
    </div>
  );
};
