import { apiClient } from './client';

export const evidenceApi = {
  downloadReportPdf: (tenderId: string) =>
    apiClient.get(`/evaluation/evidence/tenders/${tenderId}/report.pdf`, {
      responseType: 'blob',
    }),
  downloadEvidenceZip: (tenderId: string) =>
    apiClient.get(`/evaluation/evidence/tenders/${tenderId}/evidence.zip`, {
      responseType: 'blob',
    }),
};
