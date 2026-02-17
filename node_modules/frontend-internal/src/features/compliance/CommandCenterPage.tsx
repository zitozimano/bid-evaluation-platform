import React from 'react';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { KpiCard } from '../../ui/charts/KpiCard';
import { TrendLineChart } from '../../ui/charts/TrendLineChart';
import { BarChart } from '../../ui/charts/BarChart';
import { DataTable } from '../../ui/data/DataTable';
import { complianceApi } from './api';
import { Badge } from '../../ui/data/Badge';

export default function CommandCenterPage() {
  const [data, setData] = React.useState<any | null>(null);

  React.useEffect(() => {
    complianceApi.commandCenter().then((res) => setData(res.data));
  }, []);

  if (!data) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <PageHeader
        title="SCM Command Center"
        subtitle="Live view of tender health, risk, and compliance"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Active Tenders" value={data.activeTenders} />
        <KpiCard label="High Risk Tenders" value={data.highRiskTenders} tone="danger" />
        <KpiCard label="AGSA Ready" value={data.agsaReadyTenders} tone="success" />
        <KpiCard label="Average Compliance" value={`${data.avgCompliance}%`} tone="info" />
      </div>

      {/* Trend + Risk */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SectionCard title="Compliance Trend">
          <TrendLineChart
            labels={data.complianceTrend.labels}
            data={data.complianceTrend.values}
            label="Compliance Trend"
          />
        </SectionCard>

        <SectionCard title="Risk Distribution">
          <BarChart
            labels={data.riskDistribution.labels}
            data={data.riskDistribution.values}
            label="Risk Levels"
          />
        </SectionCard>
      </div>

      {/* Tender Table */}
      <SectionCard title="Tender Portfolio">
        <DataTable
          data={data.tenders}
          getRowKey={(t) => t.id}
          columns={[
            { key: 'title', header: 'Tender' },
            { key: 'department', header: 'Department' },
            {
              key: 'health',
              header: 'Health',
              render: (t: any) => <span>{t.health}%</span>,
            },
            {
              key: 'risk',
              header: 'Risk',
              render: (t: any) => (
                <Badge
                  tone={
                    t.risk === 'High'
                      ? 'danger'
                      : t.risk === 'Medium'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {t.risk}
                </Badge>
              ),
            },
            {
              key: 'agsaReady',
              header: 'AGSA Ready',
              render: (t: any) => (t.agsaReady ? 'Yes' : 'No'),
            },
          ]}
        />
      </SectionCard>
    </PageContainer>
  );
}
