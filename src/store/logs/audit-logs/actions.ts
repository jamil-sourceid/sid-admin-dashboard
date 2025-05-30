import {
  FETCH_AUDIT_LOGS_REQUEST,
  FETCH_AUDIT_LOGS_SUCCESS,
  FETCH_AUDIT_LOGS_FAILURE,
  FetchAuditLogsRequestAction,
  FetchAuditLogsSuccessAction,
  FetchAuditLogsFailureAction,
  AuditLog,
  AuditLogMeta,
  ExportAdminAuditLogsActionTypes,
  EXPORT_ADMIN_AUDIT_LOGS_REQUEST,
  EXPORT_ADMIN_AUDIT_LOGS_SUCCESS,
  EXPORT_ADMIN_AUDIT_LOGS_FAILURE,
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

interface ExportAdminAuditLogsRequestPayload {
  filter?: {
    startDate?: string;
    endDate?: string;
    search?: string;
    actionType?: string;
  };
  selectFields: {
    actionBy: boolean;
    email: boolean;
    dateTime: boolean;
    actionType: boolean;
    comments: boolean;
  };
  fileType: "pdf" | "csv" | "xlsx";
}

export const exportAdminAuditLogsRequest = (
  payload: ExportAdminAuditLogsRequestPayload
): ExportAdminAuditLogsActionTypes => ({
  type: EXPORT_ADMIN_AUDIT_LOGS_REQUEST,
  payload,
});

export const exportAdminAuditLogsSuccess = (
  result?: unknown
): ExportAdminAuditLogsActionTypes => ({
  type: EXPORT_ADMIN_AUDIT_LOGS_SUCCESS,
  payload: result,
});

export const exportAdminAuditLogsFailure = (
  error: unknown
): ExportAdminAuditLogsActionTypes => ({
  type: EXPORT_ADMIN_AUDIT_LOGS_FAILURE,
  payload: { error: error instanceof Error ? error.message : String(error) },
});
