// components/workflow/WorkflowTimelineItem.tsx
import { WorkflowLog } from '@/types/workflow';

interface Props {
  label: string;
  description: string;
  code: string;
  log?: WorkflowLog;
  isCompleted: boolean;
  isCurrent: boolean;
}

export function WorkflowTimelineItem({ label, description, code, log, isCompleted, isCurrent }: Props) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={[
            'h-4 w-4 rounded-full border-2',
            isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400',
            isCurrent && 'ring-2 ring-blue-500',
          ].join(' ')}
        />
        <div className="flex-1 w-px bg-gray-300" />
      </div>
      <div className="pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">{code}</span>
          <span className="font-semibold">{label}</span>
          {log && (
            <span className="text-xs text-gray-500">
              {new Date(log.createdAt).toLocaleDateString()} · {log.daysSpent} day(s)
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
