export const FETCH_AUDIT_LOGS_REQUEST = "FETCH_AUDIT_LOGS_REQUEST";
export const FETCH_AUDIT_LOGS_SUCCESS = "FETCH_AUDIT_LOGS_SUCCESS";
export const FETCH_AUDIT_LOGS_FAILURE = "FETCH_AUDIT_LOGS_FAILURE";

interface Organization {
  name?: string;
  [key: string]: unknown;
}

export interface AuditLog {
  updatedAt: string;
  objectBeforeUpdate: Record<string, unknown>;
  objectAfterUpdate: Record<string, unknown>;
  _id: string;
  actionTime?: string;
  organization?: Organization;
  actorType: string;
  actionType: string;
  resource: string;
}

export interface AuditLogMeta {
  page: number;
  limit: number;
  total: number;
  count: number;
}

export interface AuditLogResponse {
  data: AuditLog[];
  message: string;
  meta?: AuditLogMeta;
}

export interface AuditLogsState {
  data: AuditLog[];
  loading: boolean;
  error: string | null;
  meta: AuditLogMeta;
}

export interface FetchAuditLogsRequestAction {
  type: typeof FETCH_AUDIT_LOGS_REQUEST;
  payload?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
  };
}

export interface FetchAuditLogsSuccessAction {
  type: typeof FETCH_AUDIT_LOGS_SUCCESS;
  payload: {
    data: AuditLog[];
    meta: AuditLogMeta;
  };
}

export interface FetchAuditLogsFailureAction {
  type: typeof FETCH_AUDIT_LOGS_FAILURE;
  payload: {
    error: string;
  };
}

export type AuditLogsActionTypes =
  | FetchAuditLogsRequestAction
  | FetchAuditLogsSuccessAction
  | FetchAuditLogsFailureAction;
