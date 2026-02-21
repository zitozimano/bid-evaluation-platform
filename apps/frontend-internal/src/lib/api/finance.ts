export type FinanceLine = {
  vote: string;
  budget: number;
  committed: number;
  spent: number;
};

export async function fetchFinanceOverview() {
  return {
    totalBudget: 320_000_000,
    totalCommitted: 158_000_000,
    totalSpent: 107_000_000,
    lines: [
      { vote: "Roads & Stormwater", budget: 120_000_000, committed: 80_000_000, spent: 55_000_000 },
      { vote: "Water Services", budget: 90_000_000, committed: 60_000_000, spent: 40_000_000 },
      { vote: "Fleet", budget: 30_000_000, committed: 18_000_000, spent: 12_000_000 }
    ]
  };
}
