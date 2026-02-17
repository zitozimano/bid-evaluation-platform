import { ApiClient } from "./http";
import { Bidder } from "./types";

export class BiddersApi {
  constructor(private client: ApiClient) {}

  listByTender(tenderId: string) {
    return this.client.get<Bidder[]>(`/bidders`, {
      params: { tenderId },
    });
  }

  get(bidderId: string) {
    return this.client.get<Bidder>(`/bidders/${bidderId}`);
  }

  create(payload: Partial<Bidder> & { tenderId: string; name: string }) {
    return this.client.post<Bidder>(`/bidders`, payload);
  }

  update(bidderId: string, payload: Partial<Bidder>) {
    return this.client.patch<Bidder>(`/bidders/${bidderId}`, payload);
  }

  disqualify(bidderId: string, reason?: string) {
    return this.client.post<Bidder>(`/bidders/${bidderId}/disqualify`, {
      reason,
    });
  }
}
