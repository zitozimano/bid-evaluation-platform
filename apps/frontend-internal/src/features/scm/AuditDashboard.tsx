import React from 'react';
import { scmAuditDashboardApi } from '../../api/scmAuditDashboard';

export const AuditDashboard: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    scmAuditDashboardApi.get(tenderId).then((res) => setData(res.data));
  }, [tenderId]);

  if (!data) return <div className="text-xs text-gray-500">Loading…</div>;

  const { auditTrail, riskFlags, counts } = data;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Internal Audit Dashboard</h3>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="border rounded p-2">
          <div className="text-gray-500">Audit Events</div>
          <div className="font-semibold">{counts.auditEvents}</div>
        </div>
        <div className="border rounded p-2">
          <div className="text-gray-500">Awards</div>
          <div className="font-semibold">{counts.awards}</div>
        </div>
        <div className="border rounded p-2">
          <div className="text-gray-500">Contracts</div>
          <div className="font-semibold">{counts.contracts}</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-xs mb-1">Risk Flags</h4>
        <ul className="text-xs list-disc ml-4">
          {riskFlags.map((flag: string, idx: number) => (
            <li key={idx}>{flag}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-xs mb-1">Audit Trail</h4>
        <ul className="text-xs space-y-1">
          {auditTrail.map((log: any) => (
            <li key={log.id} className="border rounded p-2">
              <div className="font-medium">{log.action}</div>
              <div className="text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </div>
              <pre className="text-[10px] text-gray-600 mt-1">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
