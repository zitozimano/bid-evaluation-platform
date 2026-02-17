import { ApiClient } from "./http";
import { EvaluationResult } from "./types";

export class EvaluationApi {
  constructor(private client: ApiClient) {}

  run(tenderId: string) {
    return this.client.post<EvaluationResult[]>(
      `/evaluation/${tenderId}/run`
    );
  }

  getResults(tenderId: string) {
    return this.client.get<EvaluationResult[]>(
      `/evaluation/${tenderId}/results`
    );
  }

  getRuns(tenderId: string) {
    return this.client.get<any[]>(`/evaluation/${tenderId}/runs`);
  }

  getRanked(tenderId: string) {
    return this.client.get<EvaluationResult[]>(
      `/evaluation/${tenderId}/ranked`
    );
  }
}
