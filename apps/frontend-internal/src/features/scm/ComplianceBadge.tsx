import React from 'react';
import { scmComplianceApi } from '../../api/scmCompliance';

export const ComplianceBadge: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [data, setData] = React.useState<any | null>(null);

  React.useEffect(() => {
    scmComplianceApi.get(tenderId).then((res) => setData(res.data));
  }, [tenderId]);

  if (!data) return null;

  const color =
    data.level === 'HIGH'
      ? 'bg-red-100 text-red-700'
      : data.level === 'MEDIUM'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-green-100 text-green-700';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${color}`}>
      Compliance: {data.score}% ({data.level})
    </span>
  );
};
