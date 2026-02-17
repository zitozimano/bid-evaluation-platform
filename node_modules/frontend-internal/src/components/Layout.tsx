"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTenant } from "../context/TenantContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { tenantCode, branding, setTenantCode } = useTenant();

  const brandName =
    branding?.branding?.publicName || branding?.name || "Bid Evaluation Platform";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          padding: 16,
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>{brandName}</h2>
        <p style={{ fontSize: 12, color: "#666" }}>
          Internal Console – Zuzakami (Pty) Ltd
        </p>

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13 }}>
            {user ? (
              <>
                <div>{user.email}</div>
                <div>Role: {user.role}</div>
              </>
            ) : (
              <div>Not signed in</div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12 }}>Tenant Code</label>
          <input
            style={{ width: "100%" }}
            value={tenantCode || ""}
            onChange={(e) => setTenantCode(e.target.value || null)}
            placeholder="e.g. ekurhuleni"
          />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/tenders">All Tenders</Link>
          <Link href="/dashboard/scm">SCM Dashboard</Link>
          <Link href="/dashboard/cfo">CFO Dashboard</Link>
          <Link href="/dashboard/audit">Audit Dashboard</Link>
          <Link href="/dashboard/admin">Admin Dashboard</Link>
        </nav>

        <button style={{ marginTop: 24 }} onClick={logout}>
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
