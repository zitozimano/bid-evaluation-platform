import { apiClient } from './client';

export const scmEvidenceApi = {
  generateEvidencePack: (tenderId: string, period: string) =>
    apiClient.post(`/scm/evidence/tenders/${tenderId}`, { period }),
};
