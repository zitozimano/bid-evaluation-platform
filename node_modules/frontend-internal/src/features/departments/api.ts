import { apiClient } from '../../api/client';

export const departmentsApi = {
  list: () => apiClient.get('/departments'),
  get: (id: string) => apiClient.get(`/departments/${id}`),
};
