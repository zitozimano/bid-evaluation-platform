import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { biddersApi } from "../../lib/apiClient";
import { useEvidenceByBidder } from "../../hooks/useEvidence";
import type { Bidder } from "@bid-eval/api-client";

export default function BidderDetailPage() {
  const router = useRouter();
  const { bidderId } = router.query as { bidderId?: string };

  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: evidence } = useEvidenceByBidder(bidderId || null);

  useEffect(() => {
    if (!bidderId) return;
    setLoading(true);
    biddersApi
      .get(bidderId)
      .then(setBidder)
      .finally(() => setLoading(false));
  }, [bidderId]);

  if (!bidderId) return <div>Loading bidder...</div>;
  if (loading && !bidder) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Bidder Detail</h1>
      {bidder ? (
        <>
          <p>Name: {bidder.name}</p>
          <p>Price: {bidder.price ?? "N/A"}</p>
          <p>Disqualified: {bidder.disqualified ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>Bidder not found.</p>
      )}

      <section>
        <h2>Evidence</h2>
        {evidence && evidence.length > 0 ? (
          <ul>
            {evidence.map((e) => (
              <li key={e.id}>
                {e.type} —{" "}
                <a href={e.url} target="_blank" rel="noreferrer">
                  View
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No evidence captured.</p>
        )}
      </section>
    </div>
  );
}
