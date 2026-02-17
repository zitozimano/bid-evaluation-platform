export function computeComplianceRateFromCounts(
  total: number,
  compliant: number
): number {
  if (total === 0) return 0;
  return (compliant / total) * 100;
}
