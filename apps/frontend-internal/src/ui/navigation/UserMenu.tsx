import React from 'react';
import { useAuth } from '../../features/auth/AuthContext';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-700 hover:text-gray-900"
      >
        {user?.email}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow">
          <button
            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
