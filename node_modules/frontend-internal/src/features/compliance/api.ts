export const complianceApi = {
  summary: () => apiClient.get('/compliance/summary'),
  tenderHealth: (tenderId: string) => apiClient.get(`/compliance/tender-health/${tenderId}`),
  commandCenter: () => apiClient.get('/compliance/command-center'),
};
