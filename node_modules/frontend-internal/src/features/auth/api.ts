export type UserRole = 'CFO' | 'SCM' | 'Evaluator' | 'Audit' | 'AGSA' | 'Council' | 'Unknown';

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

export async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await fetch('/auth/me', { credentials: 'include' });

  if (res.status === 401) {
    return { id: '', name: '', role: 'Unknown' };
  }

  if (!res.ok) {
    throw new Error('Failed to load current user');
  }

  const data = await res.json();

  return {
    id: data.id ?? '',
    name: data.name ?? '',
    role: (data.role as UserRole) ?? 'Unknown',
  };
}
