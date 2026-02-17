import { apiClient } from '../../api/client';

export const usersApi = {
  list: () => apiClient.get('/users'),
  get: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: any) => apiClient.post('/users', data),
  update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  remove: (id: string) => apiClient.delete(`/users/${id}`),
};
