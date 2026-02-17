import React from 'react';
import { departmentsApi } from '../../api/departments';
import { Badge } from '../data/Badge';

/**
 * TenantSwitcher (Client Infrastructure Mode)
 *
 * - If the system is installed at a single municipality, tenant switching is disabled.
 * - If departments are enabled, this acts as a department switcher.
 * - If neither applies, it simply displays the current tenant name.
 */

export const TenantSwitcher: React.FC = () => {
  const [tenantName, setTenantName] = React.useState<string>('Municipality System');
  const [departments, setDepartments] = React.useState<any[]>([]);
  const [selectedDept, setSelectedDept] = React.useState<string | null>(null);
  const [switchingEnabled, setSwitchingEnabled] = React.useState(false);

  React.useEffect(() => {
    // 1. Fetch tenant info (optional)
    fetchTenantInfo();

    // 2. Fetch departments (if backend supports it)
    fetchDepartments();
  }, []);

  const fetchTenantInfo = async () => {
    try {
      const res = await fetch('/api/tenant/info');
      if (res.ok) {
        const data = await res.json();
        setTenantName(data.name || 'Municipality System');
      }
    } catch {
      // fallback to default
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await departmentsApi.list();
      if (res.data && res.data.length > 1) {
        setDepartments(res.data);
        setSwitchingEnabled(true);
      }
    } catch {
      // department switching not supported
    }
  };

  // If switching is disabled → show static tenant label
  if (!switchingEnabled) {
    return (
      <div className="flex items-center space-x-2">
        <Badge tone="info">{tenantName}</Badge>
      </div>
    );
  }

  // Switching enabled → show department selector
  return (
    <select
      value={selectedDept || ''}
      onChange={(e) => setSelectedDept(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
      <option value="">Select Department</option>
      {departments.map((d) => (
        <option key={d.id} value={d.id}>
          {d.name}
        </option>
      ))}
    </select>
  );
};
