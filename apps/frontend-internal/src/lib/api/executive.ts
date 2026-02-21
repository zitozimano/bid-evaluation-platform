export async function fetchExecutiveOverview() {
  return {
    capexExecution: 0.67,
    projectsOnTrack: 0.78,
    highRiskProjects: 3,
    exceptions: [
      "Delayed contractor appointment",
      "Budget overrun risk on Water Treatment Upgrade",
      "Fleet procurement awaiting Treasury approval"
    ]
  };
}
