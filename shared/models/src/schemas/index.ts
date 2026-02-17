import { z } from "zod";

export const ScoreSchema = z.object({
  criterionId: z.string(),
  score: z.number().min(0).max(100)
});

export const EvidenceSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string(),
  required: z.boolean(),
  provided: z.boolean(),
  url: z.string().optional(),
  hash: z.string().optional()
});

export const ComplianceSchema = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean(),
  compliant: z.boolean()
});

export const RiskFactorSchema = z.object({
  id: z.string(),
  label: z.string(),
  score: z.number().min(0).max(100)
});
