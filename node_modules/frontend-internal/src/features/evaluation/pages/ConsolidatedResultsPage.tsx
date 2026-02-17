import React from 'react';
import { useParams } from 'react-router-dom';
import { tendersApi } from '../../../api/tenders';
import { useEvaluationApi } from '../hooks/useEvaluationApi';
import { ConsolidatedResultsTable } from '../components/ConsolidatedResultsTable';
import { EvaluationExportButtons } from '../components/EvaluationExportButtons';
import { PageContainer } from '../../../ui/layout/PageContainer';
import { PageHeader } from '../../../ui/layout/PageHeader';
import { SectionCard } from '../../../ui/layout/SectionCard';

export default function ConsolidatedResultsPage() {
  const { tenderId } = useParams();
  const api = useEvaluationApi();

  const [tender, setTender] = React.useState<any | null>(null);
  const [results, setResults] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!tenderId) return;

    tendersApi.getConsolidated(tenderId).then((res) => {
      setTender(res.data.tender);
      setResults(res.data.results);
    });
  }, [tenderId]);

  if (!tender) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <PageHeader
        title={`${tender.title} – Consolidated Results`}
        subtitle={`BBBEE Weight: ${tender.bbbeeWeight} | Status: ${tender.status}`}
        actions={<EvaluationExportButtons tenderId={tenderId!} api={api} />}
      />

      <SectionCard>
        <ConsolidatedResultsTable results={results} />
      </SectionCard>
    </PageContainer>
  );
}
