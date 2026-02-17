import React from 'react';
import { useAuditApi } from '../hooks/useAuditApi';

export default function AuditLogPage() {
  const api = useAuditApi();
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    api.list().then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Audit Logs</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
}
