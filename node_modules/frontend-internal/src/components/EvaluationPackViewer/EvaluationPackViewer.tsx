// src/components/EvaluationPackViewer/EvaluationPackViewer.tsx
import TenderSummary from "./TenderSummary";
import EvaluationConfig from "./EvaluationConfig";
import BidderSummaryTable from "./BidderSummaryTable";
import RankingTable from "./RankingTable";
import BidderDetails from "./BidderDetails";
import AuditTrail from "./AuditTrail";
import "./styles.css";

interface EvaluationPackViewerProps {
  pack: any;
}

export default function EvaluationPackViewer({ pack }: EvaluationPackViewerProps) {
  return (
    <div className="pack-container">
      <h1>Evaluation Pack Preview</h1>

      <TenderSummary tender={pack.tender} />
      <EvaluationConfig tender={pack.tender} />
      <BidderSummaryTable bidders={pack.bidders} />
      <RankingTable ranking={pack.ranking} />
      <BidderDetails bidders={pack.bidders} />
      <AuditTrail audit={pack.audit} />

      <div className="download-section">
        <button onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
    </div>
  );
}
