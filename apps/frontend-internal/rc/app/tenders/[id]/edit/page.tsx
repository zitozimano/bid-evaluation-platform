"use client";

import { useEffect, useState } from "react";

export default function EditTenderPage({ params }: any) {
  const { id } = params;

  const [tender, setTender] = useState<any>(null);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  async function load() {
    const t = await fetch(`/api/public/tenders/${id}`).then((r) => r.json());
    const d = await fetch(`/api/admin/departments`).then((r) => r.json());
    const c = await fetch(`/api/admin/categories`).then((r) => r.json());

    setTender(t);
    setDepartments(d);
    setCategories(c);
  }

  async function save() {
    await fetch(`/api/admin/tenders/${id}/assign`, {
      method: "PUT",
      body: JSON.stringify({
        departmentId: tender.departmentId || null,
        categoryId: tender.categoryId || null,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Tender updated successfully.");
  }

  useEffect(() => {
    load();
  }, []);

  if (!tender) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Tender</h1>

      <div className="space-y-6">

        <div>
          <label className="block text-sm mb-1">Department</label>
          <select
            className="border px-2 py-1 w-full rounded"
            value={tender.departmentId ?? ""}
            onChange={(e) =>
              setTender({ ...tender, departmentId: e.target.value })
            }
          >
            <option value="">None</option>
            {departments.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            className="border px-2 py-1 w-full rounded"
            value={tender.categoryId ?? ""}
            onChange={(e) =>
              setTender({ ...tender, categoryId: e.target.value })
            }
          >
            <option value="">None</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
