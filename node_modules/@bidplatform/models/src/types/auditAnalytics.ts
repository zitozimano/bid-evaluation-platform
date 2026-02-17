export interface AnalyticsAccessLogItem {
  id: string;
  userId: string;
  role: string;
  endpoint: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export interface AuditUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export interface AuditTender {
  id: string;
  number: string;
  description: string;
}

export interface ListAnalyticsAccessLogsResponse {
  success: boolean;
  data: {
    total: number;
    page: number;
    pageSize: number;
    logs: AnalyticsAccessLogItem[];
  };
}

export interface ListAuditUsersResponse {
  success: boolean;
  data: AuditUser[];
}

export interface ListAuditTendersResponse {
  success: boolean;
  data: AuditTender[];
}
