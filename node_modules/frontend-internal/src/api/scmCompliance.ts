import { apiClient } from './client';

export const scmComplianceApi = {
  get: (tenderId: string) =>
    apiClient.get(`/scm/compliance/tenders/${tenderId}`),
};
