"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth/client";
import { Can } from "@/components/Rbac";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  async function load() {
    const data = await apiFetch("/users");
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Can roles={["ADMIN"]}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">User Management</h1>

          <div className="space-x-2">
            <Link
              href="/admin/users/create"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Create User
            </Link>

            <Link
              href="/admin/users/invite"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Invite User
            </Link>
          </div>
        </div>

        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">Email</th>
              <th className="border px-2 py-1 text-left">Role</th>
              <th className="border px-2 py-1 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.role}</td>
                <td className="border px-2 py-1">
                  {u.active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Can>
  );
}
