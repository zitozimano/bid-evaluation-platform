import React, { useEffect, useState } from 'react';
import { fetchEvaluatorKpis } from './api';
import { RiskHeatmap } from './RiskHeatmap';
import { EvaluatorWorkloadTable } from './EvaluatorWorkloadTable';

type EvaluatorKpis = {
  tendersWithBacklog: number;
  biddersMissingScores: number;
};

export const EvaluatorDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<EvaluatorKpis | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchEvaluatorKpis();
      setKpis(data);
    })();
  }, []);

  if (!kpis) return <div>Loading Evaluator dashboard…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Evaluator Dashboard</h2>

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
            Tenders with scoring backlog
          </div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {kpis.tendersWithBacklog}
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
            Bidders missing functionality scores
          </div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>
            {kpis.biddersMissingScores}
          </div>
        </div>
      </section>

      <section>
        <RiskHeatmap />
      </section>

      <EvaluatorWorkloadTable />
    </div>
  );
};
