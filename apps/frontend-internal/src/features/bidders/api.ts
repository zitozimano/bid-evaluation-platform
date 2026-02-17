import { apiClient } from '../../api/client';

export const biddersApi = {
  listByTender: (tenderId: string) => apiClient.get(`/bidders/tender/${tenderId}`),
  get: (id: string) => apiClient.get(`/bidders/${id}`),
  create: (data: any) => apiClient.post('/bidders', data),
  update: (id: string, data: any) => apiClient.put(`/bidders/${id}`, data),
};
