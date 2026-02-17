// frontend/src/features/scm/CloseoutPackButton.tsx
import React from 'react';
import { scmCloseoutApi } from '../../api/scmCloseout';

export const CloseoutPackButton: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [loading, setLoading] = React.useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await scmCloseoutApi.generate(tenderId);
    window.open(res.data, '_blank');
    setLoading(false);
  };

  return (
    <button
      onClick={generate}
      disabled={loading}
      className="px-3 py-1 text-xs rounded bg-slate-800 text-white"
    >
      {loading ? 'Building Close‑Out Pack…' : 'Tender Close‑Out Pack'}
    </button>
  );
};
