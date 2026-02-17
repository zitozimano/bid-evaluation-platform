import React from 'react';
import { scmCouncilReportsApi } from '../../api/scmCouncilReports';
import { scmEvidenceApi } from '../../api/scmEvidence';
import { scmCouncilPackApi } from '../../api/scmCouncilPack';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';
import { useAuth } from '../../auth/useAuth';

export const CouncilReportPanel: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const { user } = useAuth();
  const role = user?.role;

  const canGenerate = role === 'ADMIN' || role === 'COUNCIL';

  const [reports, setReports] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [period, setPeriod] = React.useState('');

  const [generatingPdf, setGeneratingPdf] = React.useState(false);
  const [generatingEvidence, setGeneratingEvidence] = React.useState(false);
  const [generatingPack, setGeneratingPack] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await scmCouncilReportsApi.getReportsForTender(tenderId);
    setReports(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  const createReport = async () => {
    if (!period) return;
    setGeneratingPdf(true);
    await scmCouncilReportsApi.createReport(tenderId, period);
    setGeneratingPdf(false);
    setPeriod('');
    load();
  };

  const generateEvidence = async () => {
    if (!period) return;
    setGeneratingEvidence(true);
    const res = await scmEvidenceApi.generateEvidencePack(tenderId, period);
    window.open(res.data, '_blank');
    setGeneratingEvidence(false);
  };

  const generatePack = async () => {
    if (!period) return;
    setGeneratingPack(true);
    const res = await scmCouncilPackApi.generate(tenderId, period);
    window.open(res.data, '_blank');
    setGeneratingPack(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Council Reports</h3>

      {/* Generate Section */}
      {canGenerate && (
        <div className="flex flex-wrap gap-2 items-center">
          <input
            className="border rounded px-2 py-1 text-sm"
            placeholder="Period (e.g. 2025-Q1)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />

          <PrimaryButton
            size="sm"
            onClick={createReport}
            disabled={!period || generatingPdf}
          >
            {generatingPdf ? 'Generating PDF…' : 'Generate PDF'}
          </PrimaryButton>

          <PrimaryButton
            size="sm"
            onClick={generateEvidence}
            disabled={!period || generatingEvidence}
          >
            {generatingEvidence ? 'Building Evidence…' : 'Evidence Pack'}
          </PrimaryButton>

          <PrimaryButton
            size="sm"
            onClick={generatePack}
            disabled={!period || generatingPack}
          >
            {generatingPack ? 'Building Council Pack…' : 'Print Council Pack'}
          </PrimaryButton>
        </div>
      )}

      {/* Reports List */}
      <div className="text-xs text-gray-500">
        {loading ? 'Loading reports…' : `Reports: ${reports.length}`}
      </div>

      <div className="space-y-2">
        {reports.map((r) => (
          <div
            key={r.id}
            className="border rounded px-3 py-2 text-xs flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{r.period}</div>
              <div className="text-gray-500">
                Created {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-3 items-center">
              {r.fileUrl && (
                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  PDF
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
