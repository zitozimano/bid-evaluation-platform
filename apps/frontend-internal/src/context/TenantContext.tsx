"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Branding {
  code: string;
  name: string;
  branding: {
    primaryColor?: string | null;
    secondaryColor?: string | null;
    logoUrl?: string | null;
    publicName?: string | null;
  } | null;
}

interface TenantContextValue {
  tenantCode: string | null;
  branding: Branding | null;
  setTenantCode: (code: string | null) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenantCode, setTenantCodeState] = useState<string | null>(null);
  const [branding, setBranding] = useState<Branding | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("tenantCode") : null;
    if (stored) setTenantCodeState(stored);
  }, []);

  useEffect(() => {
    if (!tenantCode) {
      setBranding(null);
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/branding?tenantCode=${tenantCode}`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setBranding(data))
      .catch(() => setBranding(null));
  }, [tenantCode]);

  function setTenantCode(code: string | null) {
    setTenantCodeState(code);
    if (typeof window !== "undefined") {
      if (code) localStorage.setItem("tenantCode", code);
      else localStorage.removeItem("tenantCode");
    }
  }

  return (
    <TenantContext.Provider value={{ tenantCode, branding, setTenantCode }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}
