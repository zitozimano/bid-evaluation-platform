export type PMUProject = {
  id: string;
  name: string;
  stage: string;
  status: string;
  budget: number;
  spent: number;
};

export async function fetchPMUOverview() {
  return {
    totalProjects: 18,
    atRisk: 3,
    capitalBudget: 320_000_000,
    projects: [
      {
        id: "P-001",
        name: "Road Rehab Phase 1",
        stage: "Construction",
        status: "in_progress",
        budget: 45_000_000,
        spent: 28_000_000
      },
      {
        id: "P-002",
        name: "Water Treatment Upgrade",
        stage: "Design",
        status: "pending",
        budget: 30_000_000,
        spent: 5_000_000
      },
      {
        id: "P-003",
        name: "Fleet Replacement 2025",
        stage: "Procurement",
        status: "approved",
        budget: 12_500_000,
        spent: 0
      }
    ]
  };
}
