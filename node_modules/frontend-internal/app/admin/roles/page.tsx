"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const ALL_ROLES = ["SCM", "CFO", "ADMIN", "AUDIT"];

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

async function updateUserRoles(userId: string, roles: string[]) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/roles`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles }),
    },
  );
  if (!res.ok) throw new Error("Failed to update roles");
}

export default function RolesAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  function toggleRole(userId: string, role: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              roles: u.roles.includes(role)
                ? u.roles.filter((r) => r !== role)
                : [...u.roles, role],
            }
          : u,
      ),
    );
  }

  async function save(user: User) {
    await updateUserRoles(user.id, user.roles);
    alert("Roles updated");
  }

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading users…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">
        User Roles & Permissions
      </h1>

      <table className="min-w-full bg-white border rounded shadow-sm text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 text-left">User</th>
            <th className="px-3 py-2 text-left">Email</th>
            {ALL_ROLES.map((r) => (
              <th key={r} className="px-3 py-2 text-center">
                {r}
              </th>
            ))}
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-3 py-2">{u.name}</td>
              <td className="px-3 py-2">{u.email}</td>
              {ALL_ROLES.map((r) => (
                <td key={r} className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={u.roles.includes(r)}
                    onChange={() => toggleRole(u.id, r)}
                  />
                </td>
              ))}
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => save(u)}
                  className="px-3 py-1 bg-slate-900 text-white rounded text-xs"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
