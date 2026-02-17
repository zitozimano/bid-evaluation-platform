export interface VerificationResult {
  valid: boolean;
  hash: string;
  tenderId?: string;
  runNumber?: number;
  timestamp?: string;
  [key: string]: unknown;
}

export async function verifyHash(hash: string): Promise<VerificationResult> {
  const res = await fetch(`/evaluation/verify/${encodeURIComponent(hash)}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Verification failed with status ${res.status}`);
  }

  return res.json();
}
