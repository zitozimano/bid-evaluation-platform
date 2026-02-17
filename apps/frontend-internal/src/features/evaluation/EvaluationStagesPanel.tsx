import React from 'react';
import { evaluationStagesApi } from '../../api/evaluationStages';
import { PrimaryButton } from '../../ui/buttons/PrimaryButton';

export const EvaluationStagesPanel: React.FC<{ tenderId: string }> = ({ tenderId }) => {
  const [stages, setStages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await evaluationStagesApi.getByTender(tenderId);
    setStages(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [tenderId]);

  const activate = async (stageId: string) => {
    await evaluationStagesApi.activateStage(tenderId, stageId);
    load();
  };

  return (
    <div className="space-y-2">
      {stages.map((s) => (
        <div key={s.id} className="flex items-center justify-between border rounded px-2 py-1 text-sm">
          <div>
            <div className="font-medium">{s.name}</div>
            <div className="text-xs text-gray-500">
              Order {s.order} • {s.isActive ? 'Active' : 'Inactive'} • {s.isCompleted ? 'Completed' : 'In progress'}
            </div>
          </div>
          <div className="flex gap-2">
            {!s.isActive && (
              <PrimaryButton size="xs" onClick={() => activate(s.id)}>
                Activate
              </PrimaryButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
