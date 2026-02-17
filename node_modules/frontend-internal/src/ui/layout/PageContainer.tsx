import React from 'react';

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 space-y-4">{children}</div>
);
