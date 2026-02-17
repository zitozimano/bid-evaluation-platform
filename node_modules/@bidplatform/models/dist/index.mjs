// src/enums/index.ts
var EvaluationState = /* @__PURE__ */ ((EvaluationState2) => {
  EvaluationState2["DRAFT"] = "DRAFT";
  EvaluationState2["IN_PROGRESS"] = "IN_PROGRESS";
  EvaluationState2["AWAITING_APPROVAL"] = "AWAITING_APPROVAL";
  EvaluationState2["APPROVED"] = "APPROVED";
  EvaluationState2["ARCHIVED"] = "ARCHIVED";
  return EvaluationState2;
})(EvaluationState || {});
var EvidenceType = /* @__PURE__ */ ((EvidenceType2) => {
  EvidenceType2["DOCUMENT"] = "DOCUMENT";
  EvidenceType2["IMAGE"] = "IMAGE";
  EvidenceType2["LINK"] = "LINK";
  EvidenceType2["OTHER"] = "OTHER";
  return EvidenceType2;
})(EvidenceType || {});
var RiskLevel = /* @__PURE__ */ ((RiskLevel2) => {
  RiskLevel2["LOW"] = "LOW";
  RiskLevel2["MEDIUM"] = "MEDIUM";
  RiskLevel2["HIGH"] = "HIGH";
  return RiskLevel2;
})(RiskLevel || {});
var ComplianceStatus = /* @__PURE__ */ ((ComplianceStatus2) => {
  ComplianceStatus2["COMPLIANT"] = "COMPLIANT";
  ComplianceStatus2["NON_COMPLIANT"] = "NON_COMPLIANT";
  return ComplianceStatus2;
})(ComplianceStatus || {});

// src/schemas/index.ts
import { z } from "zod";
var ScoreSchema = z.object({
  criterionId: z.string(),
  score: z.number().min(0).max(100)
});
var EvidenceSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  required: z.boolean(),
  provided: z.boolean(),
  url: z.string().optional(),
  hash: z.string().optional()
});
var ComplianceSchema = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean(),
  compliant: z.boolean()
});
var RiskFactorSchema = z.object({
  id: z.string(),
  label: z.string(),
  score: z.number().min(0).max(100)
});
export {
  ComplianceSchema,
  ComplianceStatus,
  EvaluationState,
  EvidenceSchema,
  EvidenceType,
  RiskFactorSchema,
  RiskLevel,
  ScoreSchema
};
