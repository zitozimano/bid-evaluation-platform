import React from 'react';
import { scmExportApi } from '../../api/scmExport';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';

export const ScmExportPanel: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [period, setPeriod] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const exportExcel = async () => {
    if (!period) return;
    setLoading(true);
    const res = await scmExportApi.exportExcel(tenderId, period);
    const url = res.data;
    window.open(url, '_blank');
    setLoading(false);
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex gap-2 items-center">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Period (e.g. 2025-Q1)"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <PrimaryButton size="sm" onClick={exportExcel} disabled={loading}>
          Export Excel
        </PrimaryButton>
      </div>
    </div>
  );
};
