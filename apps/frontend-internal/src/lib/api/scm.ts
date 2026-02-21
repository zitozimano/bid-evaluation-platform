export type SCMTender = {
  id: string;
  description: string;
  stage: string;
  status: string;
};

export async function fetchSCMOverview() {
  return {
    activeTenders: 12,
    evaluationsInProgress: 4,
    complianceFlags: 2,
    tenders: [
      { id: "BID-001", description: "Road Rehab Phase 1", stage: "Evaluation", status: "in_progress" },
      { id: "BID-002", description: "Water Treatment Upgrade", stage: "Advertising", status: "pending" },
      { id: "BID-003", description: "Fleet Replacement 2025", stage: "Awarded", status: "approved" }
    ]
  };
}
