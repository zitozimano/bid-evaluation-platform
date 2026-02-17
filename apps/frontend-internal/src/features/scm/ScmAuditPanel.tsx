import React from 'react';
import { scmAuditApi } from '../../api/scmAudit';

export const ScmAuditPanel: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await scmAuditApi.getAuditForTender(tenderId);
    setLogs(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">SCM Audit Trail</h3>

      {loading && <div className="text-xs text-gray-500">Loading…</div>}

      <div className="space-y-1">
        {logs.map((log) => (
          <div key={log.id} className="border rounded px-2 py-1 text-xs">
            <div className="font-medium">{log.action}</div>
            <div className="text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </div>
            <pre className="text-gray-600 text-[10px] mt-1">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
