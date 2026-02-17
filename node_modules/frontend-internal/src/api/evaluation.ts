import { apiClient } from './client';

export const evaluationApi = {
  consolidate: (tenderId: string) =>
    apiClient.post(`/evaluation/tenders/${tenderId}/consolidate`),
  getConsolidated: (tenderId: string) =>
    apiClient.get(`/evaluation/tenders/${tenderId}/consolidated`),
  getDashboard: () =>
    apiClient.get('/evaluation/dashboard'),
  getAudit: (tenderId: string) =>
    apiClient.get(`/evaluation/tenders/${tenderId}/audit`),
};
