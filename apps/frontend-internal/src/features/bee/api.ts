import { apiClient } from '../../api/client';

export const beeApi = {
  submit: (data: any) => apiClient.post('/bee', data),
  list: () => apiClient.get('/bee'),
};
