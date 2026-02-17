import { apiClient } from './client';

export const searchApi = {
  search: (query: string) => apiClient.get(`/search?q=${query}`),
};
