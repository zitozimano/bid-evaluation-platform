import { apiClient } from '../../api/client';

export const exportsApi = {
  generate: (type: string) => apiClient.get(`/exports/${type}`, { responseType: 'blob' }),
  evaluationPdf: (tenderId: string) =>
    apiClient.get(`/exports/evaluation/${tenderId}/pdf`, { responseType: 'blob' }),
  evaluationEvidenceZip: (tenderId: string) =>
    apiClient.get(`/exports/evaluation/${tenderId}/evidence`, { responseType: 'blob' }),
};
