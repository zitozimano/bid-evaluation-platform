import { useRouter } from "next/router";
import { useBiddersByTender } from "../../../hooks/useBiddersByTender";
import { RequireRole } from "../../../components/RequireRole";
import { useState } from "react";
import { apiClient } from "../../../lib/apiClient";

export default function TenderBiddersPage() {
  const router = useRouter();
  const { tenderId } = router.query as { tenderId?: string };
  const { data: bidders, loading } = useBiddersByTender(tenderId || null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!tenderId) return;

    await apiClient.post(`/tenders/${tenderId}/bidders`, {
      name,
      price: price ? Number(price) : null,
    });

    router.replace(router.asPath);
  }

  if (!tenderId) return <div>Loading...</div>;

  return (
    <RequireRole role="SCM">
      <div>
        <h1>Bidders for Tender {tenderId}</h1>

        <section>
          <h2>Add Bidder</h2>
          <form onSubmit={handleAdd}>
            <div>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit">Add Bidder</button>
          </form>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Existing Bidders</h2>
          {loading && <p>Loading bidders...</p>}
          {!loading && bidders && bidders.length === 0 && (
            <p>No bidders yet.</p>
          )}
          {!loading && bidders && bidders.length > 0 && (
            <ul>
              {bidders.map((b) => (
                <li key={b.id}>
                  {b.name} — {b.price ?? "N/A"}{" "}
                  {b.disqualified ? "(Disqualified)" : ""}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </RequireRole>
  );
}
