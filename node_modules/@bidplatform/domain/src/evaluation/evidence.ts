export type EvidenceItem = {
  id: string;
  label: string;
  required: boolean;
  provided: boolean;
};

export function isEvidenceComplete(items: EvidenceItem[]) {
  return items.filter((i) => i.required).every((i) => i.provided);
}
