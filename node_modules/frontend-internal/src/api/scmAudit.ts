import { apiClient } from './client';

export const scmAuditApi = {
  getAuditForTender: (tenderId: string) =>
    apiClient.get(`/scm/audit/tenders/${tenderId}`),
};
