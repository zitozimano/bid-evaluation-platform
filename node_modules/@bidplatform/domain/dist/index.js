var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  EvaluationStates: () => EvaluationStates,
  assertTransition: () => assertTransition,
  canSubmitEvaluation: () => canSubmitEvaluation,
  canTransition: () => canTransition,
  computeBidTotal: () => computeBidTotal,
  computeFinalScore: () => computeFinalScore,
  computeRiskAdjustment: () => computeRiskAdjustment,
  computeWeightedScore: () => computeWeightedScore,
  isComplianceSatisfied: () => isComplianceSatisfied,
  isEvidenceComplete: () => isEvidenceComplete
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
