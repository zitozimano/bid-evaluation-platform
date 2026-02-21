"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Can } from "@/components/Rbac";

export default function InviteUserPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("PMU");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await apiFetch("/users/invite", {
      method: "POST",
      body: JSON.stringify({ email, role })
    });

    setMsg(`Invite sent. Token: ${res.token}`);
  }

  return (
    <Can roles={["ADMIN"]}>
      <div className="p-6 max-w-lg">
        <h1 className="text-xl font-semibold mb-4">Invite User</h1>

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

          {msg && <div className="text-green-600">{msg}</div>}

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Send Invite
          </button>
        </form>
      </div>
    </Can>
  );
}
