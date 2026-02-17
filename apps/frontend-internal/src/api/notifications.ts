import { apiClient } from './client';

export const notificationsApi = {
  list: () => apiClient.get('/notifications'),
  markRead: (id: string) => apiClient.post(`/notifications/${id}/read`),
};
