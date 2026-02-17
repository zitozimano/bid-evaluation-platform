import { apiClient } from './client';

export const scmContractsApi = {
  createContract: (payload: {
    awardId: string;
    number: string;
    startDate: string;
    endDate?: string;
    value: number;
  }) => apiClient.post('/scm/contracts', payload),

  getContractsForTender: (tenderId: string) =>
    apiClient.get(`/scm/contracts/tenders/${tenderId}`),
};
