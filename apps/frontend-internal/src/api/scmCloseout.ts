// frontend/src/api/scmCloseout.ts
import { apiClient } from './client';

export const scmCloseoutApi = {
  generate: (tenderId: string) =>
    apiClient.post(`/scm/closeout/tenders/${tenderId}`),
};
