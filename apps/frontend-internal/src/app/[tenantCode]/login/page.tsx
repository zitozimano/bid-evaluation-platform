"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth/client";

export default function TenantLoginPage({ params }) {
  const { tenantCode } = params;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [branding, setBranding] = useState<any>(null);

  useEffect(() => {
    async function loadBranding() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/tenant/${tenantCode}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setBranding(data);
      } catch {
        // ignore
      }
    }
    loadBranding();
  }, [tenantCode]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, tenantCode })
      }
    );

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    const data = await res.json();
    setToken(data.access_token);
    router.push(`/${tenantCode}/dashboard`);
  }

  const primary =
    branding?.branding?.primaryColor || "#1d4ed8";

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <div className="flex items-center mb-4 space-x-2">
          {branding?.branding?.logoUrl && (
            <img
              src={branding.branding.logoUrl}
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
          )}
          <h1 className="text-xl font-semibold">
            {branding?.branding?.publicName ||
              branding?.name ||
              tenantCode.toUpperCase()}
          </h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            className="border px-3 py-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <button
          type="submit"
          className="text-white px-4 py-2 rounded w-full"
          style={{ backgroundColor: primary }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
