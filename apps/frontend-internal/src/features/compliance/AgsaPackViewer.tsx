import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';
import { Badge } from '../../ui/data/Badge';
import { tendersApi } from '../../api/tenders';
import { exportsApi } from '../exports/api';

export default function AgsaPackViewer() {
  const { tenderId } = useParams();
  const [tender, setTender] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!tenderId) return;
    tendersApi.get(tenderId).then((res) => setTender(res.data));
  }, [tenderId]);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleDownloadPdf = async () => {
    if (!tenderId) return;
    const res = await exportsApi.evaluationPdf(tenderId);
    downloadBlob(res.data, `tender-${tenderId}-evaluation-report.pdf`);
  };

  const handleDownloadEvidence = async () => {
    if (!tenderId) return;
    const res = await exportsApi.evaluationEvidenceZip(tenderId);
    downloadBlob(res.data, `tender-${tenderId}-evaluation-evidence.zip`);
  };

  if (!tender) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <PageHeader
        title={`AGSA Pack – ${tender.title}`}
        subtitle="Evaluation report and supporting evidence"
        actions={
          <>
            <PrimaryButton onClick={handleDownloadPdf}>Download Evaluation Report</PrimaryButton>
            <PrimaryButton onClick={handleDownloadEvidence}>
              Download Evidence ZIP
            </PrimaryButton>
          </>
        }
      />

      <SectionCard title="Tender Summary">
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium">Department:</span> {tender.departmentName}
          </div>
          <div>
            <span className="font-medium">Status:</span> {tender.status}
          </div>
          <div>
            <span className="font-medium">BBBEE Weight:</span> {tender.bbbeeWeight}
          </div>
          <div>
            <span className="font-medium">AGSA Readiness:</span>{' '}
            <Badge tone={tender.agsaReady ? 'success' : 'warning'}>
              {tender.agsaReady ? 'Ready' : 'In Progress'}
            </Badge>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Pack Contents">
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Evaluation report (PDF)</li>
          <li>Evaluation evidence (ZIP: scores, audit logs, exports)</li>
          <li>SCM compliance summary</li>
          <li>Risk and exception notes</li>
        </ul>
      </SectionCard>
    </PageContainer>
  );
}
