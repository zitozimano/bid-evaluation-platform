import React, { useEffect, useState } from 'react';
import { fetchEvaluatorWorkload } from './api';

type WorkloadRow = {
  evaluatorId: string;
  pending: number;
  inProgress: number;
  completed: number;
};

export const EvaluatorWorkloadTable: React.FC = () => {
  const [rows, setRows] = useState<WorkloadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchEvaluatorWorkload();
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading evaluator workload…</div>;
  if (!rows.length) return <div>No evaluations found.</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Evaluator Workload</h3>
      <table>
        <thead>
          <tr>
            <th>Evaluator</th>
            <th>Pending</th>
            <th>In Progress</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.evaluatorId}>
              <td>{r.evaluatorId}</td>
              <td>{r.pending}</td>
              <td>{r.inProgress}</td>
              <td>{r.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
