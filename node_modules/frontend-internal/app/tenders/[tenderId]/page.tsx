import { TenderSummary } from "@/components/tenders/TenderSummary";
import { BiddersTable } from "@/components/tenders/BiddersTable";
import { EvaluationResultsTable } from "@/components/tenders/EvaluationResultsTable";
import { WorkflowTimeline } from "@/components/workflow/WorkflowTimeline";
import { WorkflowPanel } from "@/components/workflow/WorkflowPanel";
import { WorkflowLog } from "@/types/workflow";

interface TenderDashboardData {
  tender: {
    id: string;
    number: string;
    description: string;
    status: string;
    createdAt: string;
  };
  bidders: {
    id: string;
    name: string;
    price: number;
    bbbeeLevel: string | null;
  }[];
  evaluationResults: {
    id: string;
    bidderName: string;
    functionalityScore: number | null;
    priceScore: number | null;
    bbbeePoints: number | null;
    totalScore: number | null;
    currentStage: string | null;
  }[];
  workflow: {
    tenderId: string;
    currentStage: string | null;
    logs: WorkflowLog[];
  };
}

async function fetchTenderDashboard(tenderId: string): Promise<TenderDashboardData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenders/${tenderId}/dashboard`,
    { cache: "no-store", credentials: "include" },
  );
  if (!res.ok) throw new Error("Failed to load tender dashboard");
  return res.json();
}

export default async function TenderDashboardPage({ params }: { params: { tenderId: string } }) {
  const data = await fetchTenderDashboard(params.tenderId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tender {data.tender.number}</h1>

      <TenderSummary tender={data.tender} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BiddersTable bidders={data.bidders} />
        <EvaluationResultsTable results={data.evaluationResults} />
      </div>

      <WorkflowPanel
        tenderId={data.tender.id}
        workflow={data.workflow}
        evaluationResults={data.evaluationResults}
      />
    </div>
  );
}
