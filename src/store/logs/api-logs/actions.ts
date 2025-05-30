import {
  FETCH_API_LOGS_REQUEST,
  FETCH_API_LOGS_SUCCESS,
  FETCH_API_LOGS_FAILURE,
  FetchApiLogsRequestAction,
  FetchApiLogsSuccessAction,
  FetchApiLogsFailureAction,
  ApiLog,
  ApiLogMeta,
  EXPORT_ADMINUSER_API_LOGS_REQUEST,
  ExportAdminUserApiLogsActionTypes,
  EXPORT_ADMINUSER_API_LOGS_SUCCESS,
  EXPORT_ADMINUSER_API_LOGS_FAILURE,
} from "./types";

export const fetchApiLogsRequest = (params?: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  status?: string;
}): FetchApiLogsRequestAction => ({
  type: FETCH_API_LOGS_REQUEST,
  payload: params,
});

export const fetchApiLogsSuccess = (
  data: ApiLog[],
  meta: ApiLogMeta
): FetchApiLogsSuccessAction => ({
  type: FETCH_API_LOGS_SUCCESS,
  payload: { data, meta },
});

export const fetchApiLogsFailure = (
  error: string | Error
): FetchApiLogsFailureAction => ({
  type: FETCH_API_LOGS_FAILURE,
  payload: { error: typeof error === "string" ? error : error.message },
});
interface ExportAdminUserApiLogsRequestPayload {
  filter?: {
    startDate?: string;
    endDate?: string;
    search?: string;
    status?: string;
  };
  selectFields: {
    company: boolean;
    application: boolean;
    apiType: boolean;
    endpoint: boolean;
    status: boolean;
  };
  fileType: "pdf" | "csv" | "xlsx";
}

export const exportAdminUserApiLogsRequest = (
  payload: ExportAdminUserApiLogsRequestPayload
): ExportAdminUserApiLogsActionTypes => ({
  type: EXPORT_ADMINUSER_API_LOGS_REQUEST,
  payload,
});

export const exportAdminUserApiLogsSuccess = (
  result?: unknown
): ExportAdminUserApiLogsActionTypes => ({
  type: EXPORT_ADMINUSER_API_LOGS_SUCCESS,
  payload: result,
});

export const exportAdminUserApiLogsFailure = (
  error: unknown
): ExportAdminUserApiLogsActionTypes => ({
  type: EXPORT_ADMINUSER_API_LOGS_FAILURE,
  payload: { error: error instanceof Error ? error.message : String(error) },
});
