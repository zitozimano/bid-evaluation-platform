import React from 'react';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';
import { exportsApi } from './api';

export default function ExportPanel() {
  const handleExport = async (type: string) => {
    const res = await exportsApi.generate(type);
    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export.pdf`;
    a.click();
  };

  return (
    <PageContainer>
      <PageHeader title="Export Center" subtitle="Generate AGSA and SCM export packs" />

      <SectionCard title="Available Exports">
        <div className="space-y-3">
          <PrimaryButton onClick={() => handleExport('evaluation')}>
            Evaluation Report
          </PrimaryButton>

          <PrimaryButton onClick={() => handleExport('department-comparison')}>
            Department Comparison Pack
          </PrimaryButton>

          <PrimaryButton onClick={() => handleExport('council-pack')}>
            Council Pack
          </PrimaryButton>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
