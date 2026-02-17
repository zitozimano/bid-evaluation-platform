import { apiRequest } from './client';

export async function listBiddersForTender(tenderId: string, token: string) {
  return apiRequest(`/bidders/tender/${tenderId}`, {}, token);
}

export async function createBidder(
  data: { tenderId: string; name: string; price: number; bbbeeLevel: number },
  token: string,
) {
  return apiRequest('/bidders', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}
