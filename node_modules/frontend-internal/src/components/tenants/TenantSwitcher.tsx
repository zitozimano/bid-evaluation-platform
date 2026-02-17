"use client";

import { useEffect, useState } from "react";

interface Tenant {
  id: string;
  name: string;
  code: string;
}

interface Props {
  value?: string;
  onChange: (tenantId?: string) => void;
}

async function fetchTenants(): Promise<Tenant[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tenants`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load tenants");
  return res.json();
}

export function TenantSwitcher({ value, onChange }: Props) {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    fetchTenants().then(setTenants).catch(console.error);
  }, []);

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={value ?? ""}
      onChange={(e) => {
        const v = e.target.value || undefined;
        onChange(v);
      }}
    >
      <option value="">All tenants</option>
      {tenants.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name} ({t.code})
        </option>
      ))}
    </select>
  );
}
