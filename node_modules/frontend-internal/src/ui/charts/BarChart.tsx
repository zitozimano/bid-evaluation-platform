import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ labels, data, label }) => {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: '#2563eb',
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
      }}
    />
  );
};
