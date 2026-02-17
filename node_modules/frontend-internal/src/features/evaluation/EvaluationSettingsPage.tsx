import React from 'react';
import { useParams } from 'react-router-dom';
import { evaluationSettingsApi } from '../../api/evaluationSettings';
import { PageContainer } from '../../ui/layout/PageContainer';
import { PageHeader } from '../../ui/layout/PageHeader';
import { SectionCard } from '../../ui/layout/SectionCard';
import { LoadingSkeleton } from '../../ui/feedback/LoadingSkeleton';
import { ErrorState } from '../../ui/feedback/ErrorState';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';

const EvaluationSettingsPage: React.FC = () => {
  const { tenderId } = useParams();
  const [settings, setSettings] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = async () => {
    if (!tenderId) return;
    try {
      setError(null);
      setLoading(true);
      const res = await evaluationSettingsApi.getByTender(tenderId);
      setSettings(res.data);
    } catch (e) {
      setError('Failed to load evaluation settings.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  const handleChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!tenderId || !settings) return;
    try {
      setError(null);
      setSaving(true);
      await evaluationSettingsApi.updateByTender(tenderId, {
        functionalityPassMark: Number(settings.functionalityPassMark),
        enforceCriteriaMinimums: Boolean(settings.enforceCriteriaMinimums),
        autoDisqualifyBelowMin: Boolean(settings.autoDisqualifyBelowMin),
      });
    } catch (e) {
      setError('Failed to save evaluation settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Evaluation Settings"
        subtitle={`Tender: ${tenderId}`}
      />

      {error && <ErrorState message={error} onRetry={load} />}

      <SectionCard title="Scoring Rules">
        {loading && !settings ? (
          <LoadingSkeleton lines={4} />
        ) : settings ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Functionality Pass Mark (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={settings.functionalityPassMark}
                onChange={(e) =>
                  handleChange('functionalityPassMark', e.target.value)
                }
                className="border rounded px-2 py-1 text-sm w-32"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="enforceCriteriaMinimums"
                type="checkbox"
                checked={settings.enforceCriteriaMinimums}
                onChange={(e) =>
                  handleChange('enforceCriteriaMinimums', e.target.checked)
                }
              />
              <label
                htmlFor="enforceCriteriaMinimums"
                className="text-sm"
              >
                Enforce criteria minimum scores
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="autoDisqualifyBelowMin"
                type="checkbox"
                checked={settings.autoDisqualifyBelowMin}
                onChange={(e) =>
                  handleChange('autoDisqualifyBelowMin', e.target.checked)
                }
              />
              <label
                htmlFor="autoDisqualifyBelowMin"
                className="text-sm"
              >
                Auto‑disqualify bidders below functionality pass mark
              </label>
            </div>

            <PrimaryButton onClick={handleSave} loading={saving}>
              Save Settings
            </PrimaryButton>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            No settings available.
          </div>
        )}
      </SectionCard>
    </PageContainer>
  );
};

export default EvaluationSettingsPage;
