import React from 'react';
import { Line } from 'react-chartjs-2';

export const TrendLineChart = ({ labels, data, label }) => {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            tension: 0.3,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      }}
    />
  );
};
