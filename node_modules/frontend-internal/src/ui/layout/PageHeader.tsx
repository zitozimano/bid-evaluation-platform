import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export const PageHeader: React.FC<Props> = ({ title, subtitle, actions }) => (
  <div className="flex justify-between items-start mb-4">
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center space-x-2">{actions}</div>}
  </div>
);
