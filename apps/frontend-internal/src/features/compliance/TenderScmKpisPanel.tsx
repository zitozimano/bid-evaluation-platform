import React, { useEffect, useState } from 'react';
import { fetchTenderScmKpis } from './api';

type TenderScmKpis = {
  tenderId: string;
  title: string;
  status: string;
  daysFromCreationToClosing: number | null;
  daysFromClosingToAward: number | null;
  totalCycleDays: number | null;
};

type Props = {
  tenderId: string;
};

export const TenderScmKpisPanel: React.FC<Props> = ({ tenderId }) => {
  const [kpis, setKpis] = useState<TenderScmKpis | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTenderScmKpis(tenderId);
      setKpis(data);
    })();
  }, [tenderId]);

  if (!kpis) return <div>Loading SCM KPIs…</div>;

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', marginBottom: 24 }}>
      <h3>SCM KPIs for this Tender</h3>
      <p>
        <strong>Status:</strong> {kpis.status}
      </p>
      <ul>
        <li>
          <strong>Days: Creation → Closing:</strong>{' '}
          {kpis.daysFromCreationToClosing ?? 'N/A'}
        </li>
        <li>
          <strong>Days: Closing → Award:</strong>{' '}
          {kpis.daysFromClosingToAward ?? 'N/A'}
        </li>
        <li>
          <strong>Total Cycle Days (Creation → Award):</strong>{' '}
          {kpis.totalCycleDays ?? 'N/A'}
        </li>
      </ul>
    </div>
  );
};
