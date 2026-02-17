import React from 'react';

type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export const EmptyState: React.FC<Props> = ({ title, description, action }) => (
  <div className="border border-dashed border-gray-300 rounded p-6 text-center space-y-2">
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    {description && <p className="text-xs text-gray-500">{description}</p>}
    {action && <div className="pt-2">{action}</div>}
  </div>
);
