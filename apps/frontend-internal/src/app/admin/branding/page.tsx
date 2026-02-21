"use client";

import { useEffect, useState } from "react";

type Branding = {
  primaryColor: string | null;
  secondaryColor: string | null;
  logoUrl: string | null;
  publicName: string | null;
};

export default function BrandingPage() {
  // TODO: Replace with real tenant ID from session or config
  const TENANT_ID = "default";

  const [branding, setBranding] = useState<Branding>({
    primaryColor: "",
    secondaryColor: "",
    logoUrl: "",
    publicName: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/tenants/${TENANT_ID}/branding`)
      .then(res => res.json())
      .then(data => setBranding(data));
  }, []);

  const updateField =
    (field: keyof Branding) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBranding(prev => ({ ...prev, [field]: e.target.value }));
    };

  const save = async () => {
    setSaving(true);
    await fetch(`/api/tenants/${TENANT_ID}/branding`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branding),
    });
    setSaving(false);
  };

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Tenant Branding</h1>

      <div style={{ marginTop: 24 }}>
        <label style={{ display: "block", marginBottom: 12 }}>
          Public Name
          <input
            type="text"
            value={branding.publicName ?? ""}
            onChange={updateField("publicName")}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Primary Color
          <input
            type="text"
            value={branding.primaryColor ?? ""}
            onChange={updateField("primaryColor")}
            placeholder="#003366"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Secondary Color
          <input
            type="text"
            value={branding.secondaryColor ?? ""}
            onChange={updateField("secondaryColor")}
            placeholder="#999999"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Logo Path (server file path or URL)
          <input
            type="text"
            value={branding.logoUrl ?? ""}
            onChange={updateField("logoUrl")}
            placeholder="/uploads/logos/tenant.png"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <button
          onClick={save}
          disabled={saving}
          style={{
            marginTop: 16,
            padding: "10px 20px",
            background: "#003366",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Branding"}
        </button>
      </div>
    </div>
  );
}
