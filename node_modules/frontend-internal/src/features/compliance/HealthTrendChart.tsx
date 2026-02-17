import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchHealthTrend } from './api';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

type Props = {
  tenderId: string;
};

type TrendPoint = {
  timestamp: string;
  health: number;
  risk: number;
};

export const HealthTrendChart: React.FC<Props> = ({ tenderId }) => {
  const [points, setPoints] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchHealthTrend(tenderId);
        setPoints(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [tenderId]);

  if (loading) return <div>Loading health trend…</div>;
  if (!points.length) return <div>No health snapshots yet.</div>;

  const labels = points.map((p) =>
    new Date(p.timestamp).toLocaleDateString(),
  );
  const health = points.map((p) => p.health);
  const risk = points.map((p) => p.risk);

  const data = {
    labels,
    datasets: [
      {
        label: 'Health',
        data: health,
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
      },
      {
        label: 'Risk',
        data: risk,
        borderColor: 'rgba(220, 53, 69, 1)',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
      },
    ],
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Tender Health Trend</h3>
      <div style={{ maxWidth: 800 }}>
        <Line data={data} />
      </div>
    </div>
  );
};
