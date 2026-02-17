import React from 'react';
import { useDepartmentsApi } from '../hooks/useDepartmentsApi';

export default function DepartmentOverviewPage() {
  const api = useDepartmentsApi();
  const [departments, setDepartments] = React.useState([]);

  React.useEffect(() => {
    api.list().then((res) => setDepartments(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Departments</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(departments, null, 2)}</pre>
    </div>
  );
}
