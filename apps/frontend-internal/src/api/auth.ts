import { apiRequest } from './client';

export interface LoginResponse {
  accessToken: string;
  user: { id: string; email: string; role: string };
}

export async function login(email: string, password: string) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  email: string,
  name: string,
  password: string,
  role: string,
) {
  return apiRequest<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, name, password, role }),
  });
}
