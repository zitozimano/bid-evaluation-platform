export enum EvaluationState {
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  APPROVED = "APPROVED",
  ARCHIVED = "ARCHIVED"
}

export enum EvidenceType {
  DOCUMENT = "DOCUMENT",
  IMAGE = "IMAGE",
  LINK = "LINK",
  OTHER = "OTHER"
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT"
}
