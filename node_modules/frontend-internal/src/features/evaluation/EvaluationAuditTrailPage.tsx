import React from 'react';
import { useParams } from 'react-router-dom';
import { evaluationApi } from '../../api/evaluation';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { DataTable } from '../../ui/data/DataTable';
import { LoadingSkeleton } from '../../ui/feedback/LoadingSkeleton';
import { ErrorState } from '../../ui/feedback/ErrorState';

const EvaluationAuditTrailPage: React.FC = () => {
  const { tenderId } = useParams();
  const [entries, setEntries] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = async () => {
    if (!tenderId) return;
    try {
      setError(null);
      setLoading(true);
      const res = await evaluationApi.getAudit(tenderId);
      setEntries(res.data);
    } catch (e) {
      setError('Failed to load audit trail.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  return (
    <PageContainer>
      <PageHeader
        title="Evaluation Audit Trail"
        subtitle={`Tender: ${tenderId}`}
      />

      {error && <ErrorState message={error} onRetry={load} />}

      <SectionCard title="Audit Entries">
        {loading && entries.length === 0 ? (
          <LoadingSkeleton lines={6} />
        ) : entries.length === 0 ? (
          <div className="text-sm text-gray-500 p-3">No audit entries found.</div>
        ) : (
          <DataTable
            data={entries}
            getRowKey={(r) => r.id}
            loading={loading}
            columns={[
              { key: 'timestamp', header: 'Timestamp' },
              { key: 'userId', header: 'User' },
              { key: 'action', header: 'Action' },
              {
                key: 'metadata',
                header: 'Details',
                render: (r: any) =>
                  r.metadata ? (
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {JSON.stringify(r.metadata, null, 2)}
                    </pre>
                  ) : (
                    <span className="text-xs text-gray-500">-</span>
                  ),
              },
            ]}
          />
        )}
      </SectionCard>
    </PageContainer>
  );
};

export default EvaluationAuditTrailPage;
