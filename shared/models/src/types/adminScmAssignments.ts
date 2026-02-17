export interface ScmUser {
  id: string;
  name: string | null;
  email: string;
}

export interface ScmTender {
  id: string;
  number: string;
  description: string;
}

export interface ScmAssignment {
  id: string;
  userId: string;
  tenderId: string;
  user: ScmUser;
  tender: ScmTender;
  createdAt: string;
}

export interface ListScmAssignmentsResponse {
  success: boolean;
  data: {
    assignments: ScmAssignment[];
    users: ScmUser[];
    tenders: ScmTender[];
  };
}

export interface CreateScmAssignmentRequest {
  userId: string;
  tenderId: string;
}

export interface CreateScmAssignmentResponse {
  success: boolean;
  data: ScmAssignment;
}

export interface DeleteScmAssignmentResponse {
  success: boolean;
}
