import React, { useEffect, useState } from 'react';
import { fetchScmKpis } from './api';
import { RiskHeatmap } from './RiskHeatmap';

type ScmKpis = {
  avgProcurementCycleDays: number;
  openTendersCount: number;
  avgOpenDays: number;
};

export const ScmDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<ScmKpis | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchScmKpis();
      setKpis(data);
    })();
  }, []);

  if (!kpis) return <div>Loading SCM dashboard…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>SCM Dashboard</h2>

      <section style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>
            Avg Procurement Cycle (days)
          </div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {kpis.avgProcurementCycleDays}
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>Open Tenders</div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {kpis.openTendersCount}
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 4,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 12, color: '#666' }}>
            Avg Days Open (open tenders)
          </div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {kpis.avgOpenDays}
          </div>
        </div>
      </section>

      <section>
        <RiskHeatmap />
      </section>
    </div>
  );
};
