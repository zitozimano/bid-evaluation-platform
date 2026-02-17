import { apiClient } from './client';

export const scmExportApi = {
  exportExcel: (tenderId: string, period: string) =>
    apiClient.post(`/scm/export/tenders/${tenderId}/excel`, { period }),
};
