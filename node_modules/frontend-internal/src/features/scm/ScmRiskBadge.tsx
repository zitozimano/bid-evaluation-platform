import React from 'react';
import { scmRiskApi } from '../../api/scmRisk';

export const ScmRiskBadge: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [risk, setRisk] = React.useState<any | null>(null);

  React.useEffect(() => {
    scmRiskApi.get(tenderId).then((res) => setRisk(res.data));
  }, [tenderId]);

  if (!risk) return null;

  const color =
    risk.level === 'HIGH' ? 'bg-red-100 text-red-700' :
    risk.level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
    'bg-green-100 text-green-700';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${color}`}>
      Risk: {risk.level} ({risk.score})
    </span>
  );
};
