import { computeBidTotal } from "./scoring";
import { computeRiskAdjustment } from "./risk";
import { isEvidenceComplete } from "./evidence";
import { isComplianceSatisfied } from "./compliance";

export function computeFinalScore({
  scores,
  riskFactors
}: {
  scores: any[];
  riskFactors: any[];
}) {
  const base = computeBidTotal(scores);
  const adjustment = computeRiskAdjustment(riskFactors);
  return base * adjustment;
}

export function canSubmitEvaluation({
  evidence,
  compliance
}: {
  evidence: any[];
  compliance: any[];
}) {
  return isEvidenceComplete(evidence) && isComplianceSatisfied(compliance);
}
