import React from 'react';
import { scmCouncilPackApi } from '../../api/scmCouncilPack';

export const CouncilPackViewer: React.FC<{ tenderId: string; period: string }> = ({
  tenderId,
  period,
}) => {
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!period) return;
    setLoading(true);
    scmCouncilPackApi
      .summary(tenderId, period)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [tenderId, period]);

  if (!period) return <div className="text-xs text-gray-500">Select a period…</div>;
  if (loading) return <div className="text-xs text-gray-500">Loading council pack…</div>;
  if (!data) return <div className="text-xs text-gray-500">No pack found.</div>;

  return (
    <div className="space-y-2 text-xs">
      <div className="font-semibold text-sm">Council Pack</div>
      <ul className="space-y-1">
        <li>
          <a href={data.pdfUrl} className="text-blue-600 underline" target="_blank">
            Council Report PDF
          </a>
        </li>
        <li>
          <a href={data.excelUrl} className="text-blue-600 underline" target="_blank">
            SCM Export (Excel)
          </a>
        </li>
        <li>
          <a href={data.evidenceUrl} className="text-blue-600 underline" target="_blank">
            Evidence Pack (ZIP)
          </a>
        </li>
        <li>
          <a href={data.packUrl} className="text-blue-600 underline" target="_blank">
            Council Pack (ZIP)
          </a>
        </li>
      </ul>
    </div>
  );
};
