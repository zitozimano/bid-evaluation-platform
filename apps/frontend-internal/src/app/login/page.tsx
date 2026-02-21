// apps/frontend-internal/src/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth/client";

export default function LoginPage() {
  const [username, setUsername] = useState("pmu");
  const [password, setPassword] = useState("pmu123");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        }
      );

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const data = await res.json();
      setToken(data.access_token);

      router.push("/dashboard");
    } catch (err) {
      setError("Unable to connect to server");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h1 className="text-xl font-semibold mb-4">Sign In</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            className="border px-3 py-2 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="border px-3 py-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-3">{error}</div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
