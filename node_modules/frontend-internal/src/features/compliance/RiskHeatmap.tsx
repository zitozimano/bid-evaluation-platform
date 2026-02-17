import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { fetchRiskHeatmap } from './api';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type HeatItem = {
  tenderId: string;
  title: string;
  disqualifiedCount: number;
  deletions: number;
  rankingOps: number;
  riskScore: number;
};

export const RiskHeatmap: React.FC = () => {
  const [data, setData] = useState<HeatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchRiskHeatmap();
        setData(res);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading risk heatmap…</div>;
  if (!data.length) return <div>No tenders to display.</div>;

  const labels = data.map((d) => d.title);
  const riskScores = data.map((d) => d.riskScore);
  const disqualified = data.map((d) => d.disqualifiedCount);
  const deletions = data.map((d) => d.deletions);
  const rankingOps = data.map((d) => d.rankingOps);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Risk Score',
        data: riskScores,
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
      },
      {
        label: 'Disqualified Bidders',
        data: disqualified,
        backgroundColor: 'rgba(255, 193, 7, 0.7)',
      },
      {
        label: 'Deletions',
        data: deletions,
        backgroundColor: 'rgba(23, 162, 184, 0.7)',
      },
      {
        label: 'Ranking Ops',
        data: rankingOps,
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
      },
    ],
  };

  const options = {
    onClick: (_: any, elements: any[]) => {
      if (!elements.length) return;
      const idx = elements[0].index;
      const tender = data[idx];
      navigate(`/tenders/${tender.tenderId}/timeline`);
    },
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Risk & Anomaly Heatmap</h3>
      <p style={{ fontSize: 12, color: '#666' }}>
        Click a bar to open the tender’s lifecycle timeline.
      </p>
      <div style={{ maxWidth: 1000 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
