import { apiClient } from './client';

export const scmCouncilReportsApi = {
  createReport: (tenderId: string, period: string) =>
    apiClient.post(`/scm/council-reports/tenders/${tenderId}`, { period }),

  getReportsForTender: (tenderId: string) =>
    apiClient.get(`/scm/council-reports/tenders/${tenderId}`),
};
