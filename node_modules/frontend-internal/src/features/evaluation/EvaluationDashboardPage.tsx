import React from 'react';
import { Link } from 'react-router-dom';
import { evaluationApi } from '../../api/evaluation';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { DataTable } from '../../ui/data/DataTable';
import { Badge } from '../../ui/data/Badge';
import { useEvaluationSocket } from './useEvaluationSocket';
import { LoadingSkeleton } from '../../ui/feedback/LoadingSkeleton';
import { ErrorState } from '../../ui/feedback/ErrorState';

const EvaluationDashboardPage: React.FC = () => {
  const [summary, setSummary] = React.useState<any | null>(null);
  const [tenders, setTenders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await evaluationApi.getDashboard();
      setSummary(res.data.summary);
      setTenders(res.data.tenders);
    } catch (e) {
      setError('Failed to load evaluation dashboard.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  useEvaluationSocket(undefined, {
    onDashboardUpdated: () => {
      load();
    },
  });

  return (
    <PageContainer>
      <PageHeader
        title="Evaluation Dashboard"
        subtitle="Progress, completeness, and exceptions across all tenders"
      />

      {error && <ErrorState message={error} onRetry={load} />}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SectionCard title="Total Tenders">
          {loading && !summary ? (
            <LoadingSkeleton lines={1} />
          ) : (
            <div className="text-2xl font-semibold">
              {summary?.totalTenders ?? '-'}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Completed">
          {loading && !summary ? (
            <LoadingSkeleton lines={1} />
          ) : (
            <div className="text-2xl font-semibold text-green-600">
              {summary?.completed ?? '-'}
            </div>
          )}
        </SectionCard>

        <SectionCard title="In Progress">
          {loading && !summary ? (
            <LoadingSkeleton lines={1} />
          ) : (
            <div className="text-2xl font-semibold text-yellow-600">
              {summary?.inProgress ?? '-'}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Not Started">
          {loading && !summary ? (
            <LoadingSkeleton lines={1} />
          ) : (
            <div className="text-2xl font-semibold text-gray-600">
              {summary?.notStarted ?? '-'}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Tender Table */}
      <SectionCard title="Tender Evaluation Status">
        {loading && tenders.length === 0 ? (
          <LoadingSkeleton lines={5} />
        ) : (
          <DataTable
            data={tenders}
            getRowKey={(r) => r.tenderId}
            loading={loading}
            columns={[
              {
                key: 'title',
                header: 'Tender',
                render: (r: any) => (
                  <Link
                    to={`/evaluation/tenders/${r.tenderId}/results`}
                    className="text-blue-600 hover:underline"
                  >
                    {r.title}
                  </Link>
                ),
              },
              { key: 'status', header: 'Status' },
              {
                key: 'completeness',
                header: 'Completeness',
                render: (r: any) => (
                  <span className="font-medium">{r.completeness}%</span>
                ),
              },
              {
                key: 'hasConsolidated',
                header: 'Consolidated',
                render: (r: any) =>
                  r.hasConsolidated ? (
                    <Badge tone="success">Yes</Badge>
                  ) : (
                    <Badge tone="neutral">No</Badge>
                  ),
              },
              {
                key: 'notificationStatus',
                header: 'Alerts',
                render: (r: any) => {
                  if (r.completeness === 100)
                    return <Badge tone="success">Ready</Badge>;
                  if (r.completeness === 0)
                    return <Badge tone="neutral">No Activity</Badge>;
                  return <Badge tone="warning">Pending</Badge>;
                },
              },
              {
                key: 'exceptions',
                header: 'Exceptions',
                render: (r: any) =>
                  r.exceptions.length === 0 ? (
                    <span className="text-xs text-gray-500">None</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {r.exceptions.map((e: string, idx: number) => (
                        <Badge key={idx} tone="danger">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  ),
              },
            ]}
          />
        )}
      </SectionCard>
    </PageContainer>
  );
};

export default EvaluationDashboardPage;
