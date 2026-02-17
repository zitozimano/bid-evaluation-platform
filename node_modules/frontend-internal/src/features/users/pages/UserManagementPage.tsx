import React from 'react';
import { useUsersApi } from '../hooks/useUsersApi';
import { UserTable } from '../components/UserTable';

export default function UserManagementPage() {
  const api = useUsersApi();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    api.list().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">User Management</h1>
      <UserTable users={users} onSelect={() => {}} />
    </div>
  );
}
