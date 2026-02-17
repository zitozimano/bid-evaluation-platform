import { apiRequest } from './client';

export async function listTenders(token: string) {
  return apiRequest('/tenders', {}, token);
}

export async function getTender(id: string, token: string) {
  return apiRequest(`/tenders/${id}`, {}, token);
}

export async function createTender(
  data: { title: string; description?: string; status?: string },
  token: string,
) {
  return apiRequest('/tenders', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}
