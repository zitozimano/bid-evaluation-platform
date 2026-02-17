import { createApiClient } from "../client";
import {
  ListScmAssignmentsResponse,
  CreateScmAssignmentRequest,
  CreateScmAssignmentResponse,
  DeleteScmAssignmentResponse
} from "@bidplatform/models";

export function createAdminScmAssignmentsApi(
  client: ReturnType<typeof createApiClient>
) {
  return {
    list(): Promise<ListScmAssignmentsResponse> {
      return client.request("/admin/scm-assignments");
    },
    create(
      payload: CreateScmAssignmentRequest
    ): Promise<CreateScmAssignmentResponse> {
      return client.request("/admin/scm-assignments", {
        method: "POST",
        body: payload
      });
    },
    remove(id: string): Promise<DeleteScmAssignmentResponse> {
      return client.request(`/admin/scm-assignments/${id}`, {
        method: "DELETE"
      });
    }
  };
}
