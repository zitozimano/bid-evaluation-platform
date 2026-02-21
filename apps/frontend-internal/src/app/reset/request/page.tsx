"use client";

import { useState } from "react";

export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password/reset/request`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }
    );

    if (!res.ok) {
      setError("Email not found");
      return;
    }

    setMsg("Password reset link sent to your email.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            className="border px-3 py-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        {msg && <div className="text-green-600 text-sm mb-3">{msg}</div>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
