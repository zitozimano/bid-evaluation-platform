import { useRouter } from "next/router";
import { usePublicVerification } from "../../../hooks/usePublicVerification";

export default function PublicVerifyPage() {
  const router = useRouter();
  const { hash } = router.query as { hash?: string };

  const { data, loading, error } = usePublicVerification(hash || null);

  if (!hash) return <div>Loading...</div>;
  if (loading) return <div>Verifying...</div>;
  if (error) return <div>Error verifying: {error.message}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Public Verification</h1>
      <p>Hash: {hash}</p>

      {data ? (
        data.valid ? (
          <div>
            <p>Status: VALID</p>
            <p>Tender ID: {data.tenderId}</p>
            <p>Run Number: {data.runNumber}</p>
          </div>
        ) : (
          <p>Status: INVALID</p>
        )
      ) : (
        <p>No verification data.</p>
      )}
    </div>
  );
}
