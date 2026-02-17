import { WorkflowTimeline } from '@/components/workflow/WorkflowTimeline';
import { WorkflowLog } from '@/types/workflow';

async function fetchWorkflowLogs(tenderId: string): Promise<WorkflowLog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenders/${tenderId}/workflow`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to load workflow');
  return res.json();
}

export default async function TenderWorkflowPage({ params }: { params: { tenderId: string } }) {
  const logs = await fetchWorkflowLogs(params.tenderId);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tender Workflow</h1>
      <WorkflowTimeline logs={logs} />
    </div>
  );
}
