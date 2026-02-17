import { useState } from "react";
import { useRouter } from "next/router";
import { useCreateTender } from "../../hooks/useCreateTender";
import { RequireRole } from "../../components/RequireRole";

export default function NewTenderPage() {
  const router = useRouter();
  const { createTender, loading } = useCreateTender();

  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tender = await createTender({
      number,
      description,
      category: category || null,
    });
    router.push(`/tenders/${tender.id}`);
  }

  return (
    <RequireRole role="SCM">
      <div>
        <h1>Create Tender</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tender Number</label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Tender"}
          </button>
        </form>
      </div>
    </RequireRole>
  );
}
