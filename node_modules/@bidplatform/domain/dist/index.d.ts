type ComplianceItem = {
    id: string;
    label: string;
    required: boolean;
    compliant: boolean;
};
declare function isComplianceSatisfied(items: ComplianceItem[]): boolean;

declare function computeFinalScore({ scores, riskFactors }: {
    scores: any[];
    riskFactors: any[];
}): number;
declare function canSubmitEvaluation({ evidence, compliance }: {
    evidence: any[];
    compliance: any[];
}): boolean;

type EvidenceItem = {
    id: string;
    label: string;
    required: boolean;
    provided: boolean;
};
declare function isEvidenceComplete(items: EvidenceItem[]): boolean;

type RiskFactor = {
    id: string;
    label: string;
    score: number;
};
declare function computeRiskAdjustment(factors: RiskFactor[]): 1 | 0.95 | 0.85;

type CriterionScore = {
    criterionId: string;
    score: number;
    weight: number;
};
declare function computeWeightedScore(score: number, weight: number): number;
declare function computeBidTotal(scores: CriterionScore[]): number;

declare const EvaluationStates: readonly ["DRAFT", "IN_PROGRESS", "AWAITING_APPROVAL", "APPROVED", "ARCHIVED"];
type EvaluationState = typeof EvaluationStates[number];
declare function canTransition(from: EvaluationState, to: EvaluationState): boolean;
declare function assertTransition(from: EvaluationState, to: EvaluationState): void;

export { type ComplianceItem, type CriterionScore, type EvaluationState, EvaluationStates, type EvidenceItem, type RiskFactor, assertTransition, canSubmitEvaluation, canTransition, computeBidTotal, computeFinalScore, computeRiskAdjustment, computeWeightedScore, isComplianceSatisfied, isEvidenceComplete };
