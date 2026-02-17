import React from 'react';
import { scmRiskApi } from '../../api/scmRisk';

export const RiskHeatmap: React.FC = () => {
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    scmRiskApi.list().then((res) => setItems(res.data));
  }, []);

  const colorFor = (level: string) =>
    level === 'HIGH'
      ? 'bg-red-500'
      : level === 'MEDIUM'
      ? 'bg-yellow-400'
      : 'bg-green-500';

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">SCM Risk Heatmap</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {items.map((item) => (
          <div
            key={item.tenderId}
            className="border rounded p-2 flex flex-col justify-between"
          >
            <div className="font-medium mb-1 line-clamp-2">{item.title}</div>
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex px-2 py-1 rounded text-[10px] text-white ${colorFor(
                  item.level,
                )}`}
              >
                {item.level} ({item.score})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
