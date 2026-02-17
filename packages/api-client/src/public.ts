import { ApiClient } from "./http";
import { PublicVerificationResult } from "./types";

export class PublicApi {
  constructor(private client: ApiClient) {}

  verify(hash: string) {
    return this.client.get<PublicVerificationResult>(
      `/public/verify/${hash}`
    );
  }
}
