import { useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "../../lib/apiClient";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    tenantCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<{
        accessToken: string;
        user: any;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("tenantCode", form.tenantCode);

      // Redirect based on role
      if (res.user.role === "SCM") router.replace("/dashboard/scm");
      else if (res.user.role === "CFO") router.replace("/dashboard/cfo");
      else if (res.user.role === "ADMIN") router.replace("/dashboard/admin");
      else if (res.user.role === "AUDIT") router.replace("/dashboard/cfo");
      else router.replace("/dashboard/scm");
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-semibold">Login</h1>

        {error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-3 text-sm">
          <div className="grid gap-1">
            <label className="text-xs font-medium text-slate-600">Email</label>
            <input
              className="rounded-md border border-slate-300 px-2 py-1.5"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs font-medium text-slate-600">Password</label>
            <input
              type="password"
              className="rounded-md border border-slate-300 px-2 py-1.5"
              value={form.password}
              onChange={(e) =>
                setForm((s) => ({ ...s, password: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs font-medium text-slate-600">
              Tenant Code
            </label>
            <input
              className="rounded-md border border-slate-300 px-2 py-1.5"
              value={form.tenantCode}
              onChange={(e) =>
                setForm((s) => ({ ...s, tenantCode: e.target.value }))
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
