import { apiClient } from '../../api/client';

export const auditApi = {
  list: () => apiClient.get('/audit/logs'),
};
