import { apiClient } from './client';

export const scmRiskApi = {
  /**
   * Get risk score + flags for a single tender.
   */
  get: (tenderId: string) =>
    apiClient.get(`/scm/audit/risk/tenders/${tenderId}`),

  /**
   * Get risk scores for ALL tenders.
   * Used for:
   * - Risk Heatmap
   * - Internal Audit dashboards
   * - CFO portfolio view
   */
  list: () =>
    apiClient.get('/scm/audit/risk/tenders'),
};
