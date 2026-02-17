import React from 'react';
import { SectionCard } from '../layout/SectionCard';

type Props = {
  label: string;
  value: string | number;
  trend?: string;
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
};

export const KpiCard: React.FC<Props> = ({ label, value, trend, tone = 'neutral' }) => {
  const toneClasses = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
    neutral: 'text-gray-600',
  };

  return (
    <SectionCard>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {trend && <div className={`text-xs ${toneClasses[tone]}`}>{trend}</div>}
    </SectionCard>
  );
};
