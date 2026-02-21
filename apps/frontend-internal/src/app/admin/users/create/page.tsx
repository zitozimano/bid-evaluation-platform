"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Can } from "@/components/Rbac";

export default function CreateUserPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("PMU");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await apiFetch("/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        role,
        tenantId: tenantId || null
      })
    });

    setMsg("User created");
    setTimeout(() => router.push("/admin/users"), 1000);
  }

  return (
    <Can roles={["ADMIN"]}>
      <div className="p-6 max-w-lg">
        <h1 className="text-xl font-semibold mb-4">Create User</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              className="border px-3 py-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="border px-3 py-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Role</label>
            <select
              className="border px-3 py-2 w-full rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>ADMIN</option>
              <option>PMU</option>
              <option>SCM</option>
              <option>EVALUATOR</option>
              <option>IA</option>
              <option>CFO</option>
            </select>
          </div>

          <div>
            <label>Tenant ID (optional)</label>
            <input
              className="border px-3 py-2 w-full rounded"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
            />
          </div>

          {msg && <div className="text-green-600">{msg}</div>}

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </Can>
  );
}
