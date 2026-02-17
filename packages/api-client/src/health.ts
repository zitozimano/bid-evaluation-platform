import { ApiClient } from "./http";
import { HealthStatus } from "./types";

export class HealthApi {
  constructor(private client: ApiClient) {}

  getStatus() {
    return this.client.get<HealthStatus>(`/health`);
  }

  getLiveness() {
    return this.client.get<HealthStatus>(`/health/live`);
  }

  getReadiness() {
    return this.client.get<HealthStatus>(`/health/ready`);
  }
}
