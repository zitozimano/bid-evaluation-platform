import { apiClient } from './client';

export const evaluationSettingsApi = {
  getByTender: (tenderId: string) =>
    apiClient.get(`/evaluation/settings/tenders/${tenderId}`),
  updateByTender: (
    tenderId: string,
    payload: {
      functionalityPassMark: number;
      enforceCriteriaMinimums: boolean;
      autoDisqualifyBelowMin: boolean;
    },
  ) =>
    apiClient.put(`/evaluation/settings/tenders/${tenderId}`, payload),
};
