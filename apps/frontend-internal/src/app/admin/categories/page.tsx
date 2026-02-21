"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await fetch("/api/admin/categories");
    setCategories(await res.json());
  }

  async function create() {
    if (!name.trim()) return;
    await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    setName("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 flex-1 rounded"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={create}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="border rounded divide-y bg-white">
        {categories.map((c: any) => (
          <div key={c.id} className="p-3">
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
