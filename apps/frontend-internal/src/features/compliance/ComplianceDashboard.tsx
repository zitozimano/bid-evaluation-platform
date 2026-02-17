import React from 'react';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { KpiCard } from '../../ui/charts/KpiCard';
import { TrendLineChart } from '../../ui/charts/TrendLineChart';
import { BarChart } from '../../ui/charts/BarChart';
import { complianceApi } from './api';

export default function ComplianceDashboard() {
  const [summary, setSummary] = React.useState<any | null>(null);

  React.useEffect(() => {
    complianceApi.summary().then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <PageHeader title="Compliance Dashboard" subtitle="AGSA readiness and SCM compliance" />

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Overall Compliance" value={`${summary.overall}%`} tone="success" />
        <KpiCard label="SCM Compliance" value={`${summary.scm}%`} tone="info" />
        <KpiCard label="Risk Level" value={summary.risk} tone="warning" />
        <KpiCard label="Departments Reviewed" value={summary.departments} />
      </div>

      {/* Trend Section */}
      <SectionCard title="Compliance Trend">
        <TrendLineChart
          labels={summary.trend.labels}
          data={summary.trend.values}
          label="Compliance Trend"
        />
      </SectionCard>

      {/* Risk Breakdown */}
      <SectionCard title="Risk Breakdown">
        <BarChart
          labels={summary.riskBreakdown.labels}
          data={summary.riskBreakdown.values}
          label="Risk Levels"
        />
      </SectionCard>
    </PageContainer>
  );
}
