import { apiClient } from './client';

export const scmAwardsApi = {
  createAward: (tenderId: string, bidderId: string, notes?: string) =>
    apiClient.post(`/scm/awards/tenders/${tenderId}/bidders/${bidderId}`, { notes }),

  getAwardsForTender: (tenderId: string) =>
    apiClient.get(`/scm/awards/tenders/${tenderId}`),
};
