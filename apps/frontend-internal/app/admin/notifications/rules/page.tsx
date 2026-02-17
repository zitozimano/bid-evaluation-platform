"use client";

import { useEffect, useState } from "react";

const TRIGGERS = [
  "TENDER_STATUS_CHANGED",
  "TENDER_PUBLISHED",
  "TENDER_AWARDED",
];

const ROLES = ["SCM", "CFO", "ADMIN", "AUDIT"];

interface Rule {
  id: string;
  trigger: string;
  role: string;
  enabled: boolean;
}

async function fetchRules(): Promise<Rule[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/notification-rules`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to load rules");
  return res.json();
}

async function saveRule(rule: Rule) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/notification-rules/${rule.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    },
  );
  if (!res.ok) throw new Error("Failed to save rule");
}

export default function NotificationRulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules()
      .then(setRules)
      .finally(() => setLoading(false));
  }, []);

  function update(ruleId: string, patch: Partial<Rule>) {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, ...patch } : r)),
    );
  }

  async function save(rule: Rule) {
    await saveRule(rule);
    alert("Rule saved");
  }

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-600">
        Loading rules…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">
        Notification Rules
      </h1>

      <table className="min-w-full bg-white border rounded shadow-sm text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 text-left">Trigger</th>
            <th className="px-3 py-2 text-left">Role</th>
            <th className="px-3 py-2 text-center">Enabled</th>
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-3 py-2">
                <select
                  value={r.trigger}
                  onChange={(e) =>
                    update(r.id, { trigger: e.target.value })
                  }
                  className="border rounded px-2 py-1 text-xs"
                >
                  {TRIGGERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2">
                <select
                  value={r.role}
                  onChange={(e) =>
                    update(r.id, { role: e.target.value })
                  }
                  className="border rounded px-2 py-1 text-xs"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2 text-center">
                <input
                  type="checkbox"
                  checked={r.enabled}
                  onChange={(e) =>
                    update(r.id, { enabled: e.target.checked })
                  }
                />
              </td>
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => save(r)}
                  className="px-3 py-1 bg-slate-900 text-white rounded text-xs"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
