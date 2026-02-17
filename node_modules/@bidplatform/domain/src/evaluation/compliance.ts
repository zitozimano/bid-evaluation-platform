export type ComplianceItem = {
  id: string;
  label: string;
  required: boolean;
  compliant: boolean;
};

export function isComplianceSatisfied(items: ComplianceItem[]) {
  return items
    .filter((i) => i.required)
    .every((i) => i.compliant);
}
