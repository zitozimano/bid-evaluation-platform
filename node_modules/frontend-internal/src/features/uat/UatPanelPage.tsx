import React from 'react';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';
import { ErrorState } from '../../ui/feedback/ErrorState';

export const UatPanelPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);

  const resetEvaluation = async () => {
    try {
      setError(null);
      setMessage(null);
      setLoading(true);
      const res = await fetch('/uat/reset-evaluation', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed');
      setMessage('Evaluation UAT data reset successfully.');
    } catch (e) {
      setError('Failed to reset evaluation UAT data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="UAT Control Panel"
        subtitle="Non-production utilities for evaluation testing"
      />

      {error && <ErrorState message={error} onRetry={resetEvaluation} />}

      <SectionCard title="Evaluation UAT Data">
        <p className="text-sm text-gray-600 mb-3">
          Reset evaluation test data (tenders, bidders, criteria, scores, settings, audit).
          Only use in UAT / dev environments.
        </p>
        <PrimaryButton onClick={resetEvaluation} loading={loading}>
          Reset Evaluation UAT Data
        </PrimaryButton>
        {message && (
          <div className="mt-2 text-xs text-green-700">{message}</div>
        )}
      </SectionCard>
    </PageContainer>
  );
};
