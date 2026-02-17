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
  ComplianceSchema: () => ComplianceSchema,
  ComplianceStatus: () => ComplianceStatus,
  EvaluationState: () => EvaluationState,
  EvidenceSchema: () => EvidenceSchema,
  EvidenceType: () => EvidenceType,
  RiskFactorSchema: () => RiskFactorSchema,
  RiskLevel: () => RiskLevel,
  ScoreSchema: () => ScoreSchema
});
module.exports = __toCommonJS(index_exports);

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
var import_zod = require("zod");
var ScoreSchema = import_zod.z.object({
  criterionId: import_zod.z.string(),
  score: import_zod.z.number().min(0).max(100)
});
var EvidenceSchema = import_zod.z.object({
  id: import_zod.z.string(),
  label: import_zod.z.string(),
  type: import_zod.z.string(),
  required: import_zod.z.boolean(),
  provided: import_zod.z.boolean(),
  url: import_zod.z.string().optional(),
  hash: import_zod.z.string().optional()
});
var ComplianceSchema = import_zod.z.object({
  id: import_zod.z.string(),
  label: import_zod.z.string(),
  required: import_zod.z.boolean(),
  compliant: import_zod.z.boolean()
});
var RiskFactorSchema = import_zod.z.object({
  id: import_zod.z.string(),
  label: import_zod.z.string(),
  score: import_zod.z.number().min(0).max(100)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplianceSchema,
  ComplianceStatus,
  EvaluationState,
  EvidenceSchema,
  EvidenceType,
  RiskFactorSchema,
  RiskLevel,
  ScoreSchema
});
