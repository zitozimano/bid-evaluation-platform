import React from 'react';
import { scmDashboardApi } from '../../api/scmDashboard';

export const ScmDashboard: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await scmDashboardApi.getTenderDashboard(tenderId);
    setData(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  if (loading || !data) {
    return <div className="text-xs text-gray-500">Loading SCM dashboard…</div>;
  }

  const { tender, counts, timeline } = data;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Tender</div>
          <div className="font-semibold">{tender.title}</div>
        </div>
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Status</div>
          <div className="font-semibold">{tender.status}</div>
        </div>
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Top score</div>
          <div className="font-semibold">
            {tender.topScore != null ? tender.topScore.toFixed(2) : 'N/A'}
          </div>
        </div>
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Awards</div>
          <div className="font-semibold">{counts.awards}</div>
        </div>
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Contracts</div>
          <div className="font-semibold">{counts.contracts}</div>
        </div>
        <div className="border rounded px-3 py-2">
          <div className="text-gray-500">Council reports</div>
          <div className="font-semibold">{counts.councilReports}</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Timeline</h3>
        <ol className="border-l border-gray-300 pl-3 text-xs space-y-2">
          {timeline.map((item: any, idx: number) => (
            <li key={idx} className="relative">
              <span className="absolute -left-1.5 top-1 w-2 h-2 rounded-full bg-blue-500" />
              <div className="font-medium">{item.type}</div>
              <div className="text-gray-500">
                {new Date(item.at).toLocaleString()}
              </div>
              <div className="text-gray-600">{item.label}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
