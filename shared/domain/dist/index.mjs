// src/evaluation/compliance.ts
function isComplianceSatisfied(items) {
  return items.filter((i) => i.required).every((i) => i.compliant);
}

// src/evaluation/scoring.ts
function computeWeightedScore(score, weight) {
  return score * weight / 100;
}
function computeBidTotal(scores) {
  return scores.reduce(
    (acc, s) => acc + computeWeightedScore(s.score, s.weight),
    0
  );
}

// src/evaluation/risk.ts
function computeRiskAdjustment(factors) {
  const avg = factors.reduce((a, b) => a + b.score, 0) / factors.length;
  if (avg < 35) return 1;
  if (avg < 70) return 0.95;
  return 0.85;
}

// src/evaluation/evidence.ts
function isEvidenceComplete(items) {
  return items.filter((i) => i.required).every((i) => i.provided);
}

// src/evaluation/consolidation.ts
function computeFinalScore({
  scores,
  riskFactors
}) {
  const base = computeBidTotal(scores);
  const adjustment = computeRiskAdjustment(riskFactors);
  return base * adjustment;
}
function canSubmitEvaluation({
  evidence,
  compliance
}) {
  return isEvidenceComplete(evidence) && isComplianceSatisfied(compliance);
}

// src/stateMachine.ts
var EvaluationStates = [
  "DRAFT",
  "IN_PROGRESS",
  "AWAITING_APPROVAL",
  "APPROVED",
  "ARCHIVED"
];
var transitions = {
  DRAFT: ["IN_PROGRESS"],
  IN_PROGRESS: ["AWAITING_APPROVAL"],
  AWAITING_APPROVAL: ["APPROVED"],
  APPROVED: ["ARCHIVED"],
  ARCHIVED: []
};
function canTransition(from, to) {
  return transitions[from].includes(to);
}
function assertTransition(from, to) {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid transition: ${from} \u2192 ${to}`);
  }
}
export {
  EvaluationStates,
  assertTransition,
  canSubmitEvaluation,
  canTransition,
  computeBidTotal,
  computeFinalScore,
  computeRiskAdjustment,
  computeWeightedScore,
  isComplianceSatisfied,
  isEvidenceComplete
};
