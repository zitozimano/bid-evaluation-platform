"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({ params }) {
  const { token } = params;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password/reset/confirm`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      }
    );

    if (!res.ok) {
      setError("Invalid or expired reset link");
      return;
    }

    setMsg("Password updated. Redirecting to login...");
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h1 className="text-xl font-semibold mb-4">Set New Password</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            className="border px-3 py-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            className="border px-3 py-2 w-full rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        {msg && <div className="text-green-600 text-sm mb-3">{msg}</div>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
