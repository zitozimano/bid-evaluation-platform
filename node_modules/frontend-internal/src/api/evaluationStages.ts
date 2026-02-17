import { apiClient } from './client';

export const evaluationStagesApi = {
  getByTender: (tenderId: string) =>
    apiClient.get(`/evaluation/stages/tenders/${tenderId}`),
  initForTender: (tenderId: string) =>
    apiClient.post(`/evaluation/stages/tenders/${tenderId}/init`),
  activateStage: (tenderId: string, stageId: string) =>
    apiClient.post(`/evaluation/stages/tenders/${tenderId}/${stageId}/activate`),
};
