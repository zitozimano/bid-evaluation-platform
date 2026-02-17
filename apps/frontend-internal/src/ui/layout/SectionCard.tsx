import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const SectionCard: React.FC<Props> = ({ title, children }) => (
  <section className="bg-white rounded shadow-sm border border-gray-200 p-4 space-y-3">
    {title && <h2 className="text-sm font-semibold text-gray-700">{title}</h2>}
    {children}
  </section>
);
