export type AuditFinding = {
  id: string;
  area: string;
  severity: string;
  status: string;
};

export async function fetchAuditOverview() {
  return {
    openFindings: 7,
    highSeverity: 2,
    overdue: 1,
    findings: [
      { id: "F-001", area: "SCM", severity: "High", status: "in_progress" },
      { id: "F-002", area: "PMU", severity: "Medium", status: "pending" },
      { id: "F-003", area: "Finance", severity: "Low", status: "approved" }
    ]
  };
}
