"use client";

import { useEffect, useState } from "react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await fetch("/api/admin/departments");
    setDepartments(await res.json());
  }

  async function create() {
    if (!name.trim()) return;
    await fetch("/api/admin/departments", {
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
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 flex-1 rounded"
          placeholder="New department name"
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
        {departments.map((d: any) => (
          <div key={d.id} className="p-3">
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}
