import React from 'react';
import { scmPortfolioApi } from '../../api/scmPortfolio';

export const CfoPortfolioDashboard: React.FC = () => {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [filters, setFilters] = React.useState({
    status: '',
    risk: '',
    compliance: '',
  });

  const load = () => {
    setLoading(true);
    scmPortfolioApi
      .cfo(filters)
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    load();
  }, [filters]);

  const exportExcel = async () => {
    const res = await scmPortfolioApi.exportExcel(filters);
    window.open(res.data, '_blank');
  };

  const exportPdf = async () => {
    const res = await scmPortfolioApi.exportPdf(filters);
    window.open(res.data, '_blank');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">CFO Portfolio Compliance Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-3 items-center text-xs">
        <select
          className="border px-2 py-1 rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Status: All</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
          <option value="AWARDED">Awarded</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={filters.risk}
          onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
        >
          <option value="">Risk: All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={filters.compliance}
          onChange={(e) => setFilters({ ...filters, compliance: e.target.value })}
        >
          <option value="">Compliance: All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button
          onClick={exportExcel}
          className="px-3 py-1 bg-slate-800 text-white rounded"
        >
          Export Excel
        </button>

        <button
          onClick={exportPdf}
          className="px-3 py-1 bg-slate-800 text-white rounded"
        >
          Export PDF
        </button>
      </div>

      {/* Portfolio Grid */}
      {loading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {items.map((t) => {
            const riskColor =
              t.risk.level === 'HIGH'
                ? 'bg-red-100 text-red-700'
                : t.risk.level === 'MEDIUM'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700';

            const compColor =
              t.compliance.level === 'HIGH'
                ? 'bg-red-100 text-red-700'
                : t.compliance.level === 'MEDIUM'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700';

            return (
              <div key={t.tenderId} className="border rounded p-3 space-y-2">
                <div className="font-medium">{t.title}</div>
                <div className="text-gray-500">{t.reference}</div>

                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 rounded ${riskColor}`}>
                    Risk: {t.risk.level} ({t.risk.score})
                  </span>
                  <span className={`px-2 py-1 rounded ${compColor}`}>
                    Compliance: {t.compliance.score}% ({t.compliance.level})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
