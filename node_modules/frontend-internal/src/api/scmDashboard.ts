import { apiClient } from './client';

export const scmDashboardApi = {
  getTenderDashboard: (tenderId: string) =>
    apiClient.get(`/scm/dashboard/tenders/${tenderId}`),
};
