import { apiClient } from './client';

export const scmCouncilPackApi = {
  /**
   * Generate a full Council Pack:
   * - Council Report PDF
   * - SCM Excel Export
   * - Evidence Pack ZIP
   * - Combined Council Pack ZIP
   */
  generate: (tenderId: string, period: string) =>
    apiClient.post(`/scm/pack/tenders/${tenderId}`, { period }),

  /**
   * Fetch URLs for:
   * - council-report.pdf
   * - scm-export.xlsx
   * - evidence-pack.zip
   * - council-pack.zip
   *
   * Does NOT regenerate anything.
   */
  summary: (tenderId: string, period: string) =>
    apiClient.get(`/scm/pack/tenders/${tenderId}/period/${period}`),
};
