import { apiClient } from './client';

export const scmPortfolioApi = {
  cfo: (filters: any) =>
    apiClient.get('/scm/portfolio/cfo', { params: filters }),

  exportExcel: (filters: any) =>
    apiClient.get('/scm/portfolio/cfo/export/excel', {
      params: filters,
    }),

  exportPdf: (filters: any) =>
    apiClient.get('/scm/portfolio/cfo/export/pdf', {
      params: filters,
    }),
};
