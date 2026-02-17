// components/workflow/WorkflowTimeline.tsx
import { WorkflowLog } from '@/types/workflow';
import { WORKFLOW_STAGES } from '@/config/workflowStages';
import { WorkflowTimelineItem } from './WorkflowTimelineItem';

interface Props {
  logs: WorkflowLog[];
}

export function WorkflowTimeline({ logs }: Props) {
  const logsByStage = new Map(logs.map(l => [l.stage, l]));
  const highestIndex = Math.max(
    -1,
    ...logs.map(l => WORKFLOW_STAGES.findIndex(s => s.code === l.stage)),
  );

  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-3">Workflow Timeline</h2>
      {WORKFLOW_STAGES.map((meta, index) => {
        const log = logsByStage.get(meta.code);
        const isCompleted = !!log;
        const isCurrent = index === highestIndex;

        return (
          <WorkflowTimelineItem
            key={meta.code}
            code={meta.code}
            label={meta.label}
            description={meta.description}
            log={log}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
          />
        );
      })}
    </div>
  );
}
