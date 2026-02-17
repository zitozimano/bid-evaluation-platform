import { createApiClient } from "../client";

export function createEvaluationsApi(client: ReturnType<typeof createApiClient>) {
  return {
    getEvaluation(id: string) {
      return client.request(`/evaluations/${id}`);
    },
    updateEvaluation(id: string, data: any) {
      return client.request(`/evaluations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
    }
  };
}
