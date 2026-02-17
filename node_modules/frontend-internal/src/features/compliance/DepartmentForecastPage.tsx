import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDepartmentForecast } from './api';
import { DepartmentNav } from './DepartmentNav';

type ForecastResponse = {
  department: string;
  forecast: number | null;
  trend: 'improving' | 'declining' | 'flat';
};

export const DepartmentForecastPage: React.FC = () => {
  const { department } = useParams();
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetchDepartmentForecast(department);
        setData(res);
      } finally {
        setLoading(false);
      }
    })();
  }, [department]);

  if (loading) return <div style={{ padding: 24 }}>Loading forecast…</div>;
  if (!data)
    return (
      <div style={{ padding: 24 }}>
        <h2>Department Forecast: {department}</h2>
        <DepartmentNav />
        <p>No forecast available.</p>
      </div>
    );

  return (
    <div style={{ padding: 24 }}>
      <h2>Department Forecast: {department}</h2>
      <DepartmentNav />

      <p style={{ marginTop: 16 }}>
        Trend: <strong>{data.trend}</strong>
      </p>
      <p>
        Forecast compliance in 7 days:{' '}
        <strong>{data.forecast !== null ? `${data.forecast}` : 'N/A'}</strong>
      </p>
    </div>
  );
};
