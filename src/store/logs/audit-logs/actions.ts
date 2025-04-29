import {
  FETCH_AUDIT_LOGS_REQUEST,
  FETCH_AUDIT_LOGS_SUCCESS,
  FETCH_AUDIT_LOGS_FAILURE,
  FetchAuditLogsRequestAction,
  FetchAuditLogsSuccessAction,
  FetchAuditLogsFailureAction,
  AuditLog,
  AuditLogMeta,
} from "./types";

export const fetchAuditLogsRequest = (params?: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  actionType?: string;
}): FetchAuditLogsRequestAction => ({
  type: FETCH_AUDIT_LOGS_REQUEST,
  payload: params,
});

export const fetchAuditLogsSuccess = (
  data: AuditLog[],
  meta: AuditLogMeta
): FetchAuditLogsSuccessAction => ({
  type: FETCH_AUDIT_LOGS_SUCCESS,
  payload: { data, meta },
});

export const fetchAuditLogsFailure = (
  error: string | Error
): FetchAuditLogsFailureAction => ({
  type: FETCH_AUDIT_LOGS_FAILURE,
  payload: { error: typeof error === "string" ? error : error.message },
});
