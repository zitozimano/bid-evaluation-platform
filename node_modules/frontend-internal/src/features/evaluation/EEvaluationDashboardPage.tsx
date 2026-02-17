import React from 'react';
import { Link } from 'react-router-dom';
import { evaluationApi } from '../../api/evaluation';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { DataTable } from '../../ui/data/DataTable';
import { Badge } from '../../ui/data/Badge';

const EvaluationDashboardPage: React.FC = () => {
  const [summary, setSummary] = React.useState<any | null>(null);
  const [tenders, setTenders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await evaluationApi.getDashboard();
    setSummary(res.data.summary);
    setTenders(res.data.tenders);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Evaluation Dashboard"
        subtitle="Progress, completeness, and exceptions across all tenders"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SectionCard title="Total Tenders">
          <div className="text-2xl font-semibold">
            {summary?.totalTenders ?? '-'}
          </div>
        </SectionCard>

        <SectionCard title="Completed">
          <div className="text-2xl font-semibold text-green-600">
            {summary?.completed ?? '-'}
          </div>
        </SectionCard>

        <SectionCard title="In Progress">
          <div className="text-2xl font-semibold text-yellow-600">
            {summary?.inProgress ?? '-'}
          </div>
        </SectionCard>

        <SectionCard title="Not Started">
          <div className="text-2xl font-semibold text-gray-600">
            {summary?.notStarted ?? '-'}
          </div>
        </SectionCard>
      </div>

      {/* Tender Table */}
      <SectionCard title="Tender Evaluation Status">
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
      </SectionCard>
    </PageContainer>
  );
};

export default EvaluationDashboardPage;
