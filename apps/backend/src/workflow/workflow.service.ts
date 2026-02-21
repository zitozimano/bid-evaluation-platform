import { Injectable } from "@nestjs/common";

export type TenderState =
  | "draft"
  | "advertised"
  | "closed"
  | "evaluation"
  | "recommended"
  | "awarded"
  | "archived";

export type EvaluationState =
  | "not_started"
  | "compliance"
  | "functionality"
  | "price"
  | "preference"
  | "recommendation"
  | "completed";

@Injectable()
export class WorkflowService {
  tenderTransitions: Record<TenderState, TenderState[]> = {
    draft: ["advertised"],
    advertised: ["closed"],
    closed: ["evaluation"],
    evaluation: ["recommended"],
    recommended: ["awarded"],
    awarded: ["archived"],
    archived: []
  };

  evaluationTransitions: Record<EvaluationState, EvaluationState[]> = {
    not_started: ["compliance"],
    compliance: ["functionality"],
    functionality: ["price"],
    price: ["preference"],
    preference: ["recommendation"],
    recommendation: ["completed"],
    completed: []
  };

  canTransitionTender(from: TenderState, to: TenderState) {
    return this.tenderTransitions[from].includes(to);
  }

  canTransitionEvaluation(from: EvaluationState, to: EvaluationState) {
    return this.evaluationTransitions[from].includes(to);
  }
}
