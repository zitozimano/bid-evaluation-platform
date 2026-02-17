import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from './api';

//
// Types
//

export type UserRole = 'ADMIN' | 'EVALUATOR' | 'VIEWER' | 'Unknown';

export type AuthUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'EVALUATOR' | 'VIEWER';
};

type AuthState = {
  user: AuthUser | null;
  role: UserRole;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

//
// Context
//

const AuthContext = createContext<AuthState | undefined>(undefined);

//
// Provider
//

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>('Unknown');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const u: AuthUser = await fetchCurrentUser();

      setUser(u);
      setRole(u.role);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load user');
      setUser(null);
      setRole('Unknown');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        error,
        refresh: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//
// Hook
//

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
}
