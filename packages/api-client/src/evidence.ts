import { ApiClient } from "./http";
import { EvidenceItem } from "./types";

export class EvidenceApi {
  constructor(private client: ApiClient) {}

  listByTender(tenderId: string) {
    return this.client.get<EvidenceItem[]>(
      `/evidence/tender/${tenderId}`
    );
  }

  listByBidder(bidderId: string) {
    return this.client.get<EvidenceItem[]>(
      `/evidence/bidder/${bidderId}`
    );
  }

  create(bidderId: string, payload: { type: string; url: string; metadata?: any }) {
    return this.client.post<EvidenceItem>(
      `/evidence/bidder/${bidderId}`,
      payload
    );
  }

  remove(id: string) {
    return this.client.delete<void>(`/evidence/${id}`);
  }
}
