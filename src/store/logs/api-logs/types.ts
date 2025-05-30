export const FETCH_API_LOGS_REQUEST = "FETCH_API_LOGS_REQUEST";
export const FETCH_API_LOGS_SUCCESS = "FETCH_API_LOGS_SUCCESS";
export const FETCH_API_LOGS_FAILURE = "FETCH_API_LOGS_FAILURE";

export const EXPORT_ADMINUSER_API_LOGS_REQUEST =
  "EXPORT_ADMINUSER_API_LOGS_REQUEST";
export const EXPORT_ADMINUSER_API_LOGS_SUCCESS =
  "EXPORT_ADMINUSER_API_LOGS_SUCCESS";
export const EXPORT_ADMINUSER_API_LOGS_FAILURE =
  "EXPORT_ADMINUSER_API_LOGS_FAILURE";

export interface ApiLog {
  _id: string;
  method: string;
  endpoint: string;
  statusCode: number;
  timestamp: string;
  requestPayload?: Record<string, unknown>;
  responsePayload?: Record<string, unknown>;
  responseTimeMs?: number;
  user?: {
    id?: string;
    email?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ApiLogMeta {
  page: number;
  limit: number;
  total: number;
  count: number;
}

export interface ApiLogResponse {
  data: ApiLog[];
  message: string;
  meta?: ApiLogMeta;
}

export interface ApiLogsState {
  data: ApiLog[];
  loading: boolean;
  error: string | null;
  meta: ApiLogMeta;
  exportLoading: boolean;
  exportError: string | null;
}
export interface FetchApiLogsRequestAction {
  type: typeof FETCH_API_LOGS_REQUEST;
  payload?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
    statusCode?: number;
    method?: string;
  };
}

export interface FetchApiLogsSuccessAction {
  type: typeof FETCH_API_LOGS_SUCCESS;
  payload: {
    data: ApiLog[];
    meta: ApiLogMeta;
  };
}

export interface FetchApiLogsFailureAction {
  type: typeof FETCH_API_LOGS_FAILURE;
  payload: {
    error: string;
  };
}
export interface ExportAdminUserApiLogsRequestAction {
  type: typeof EXPORT_ADMINUSER_API_LOGS_REQUEST;
  payload: {
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
  };
}

export interface ExportAdminUserApiLogsSuccessAction {
  type: typeof EXPORT_ADMINUSER_API_LOGS_SUCCESS;
  payload?: unknown;
}

export interface ExportAdminUserApiLogsFailureAction {
  type: typeof EXPORT_ADMINUSER_API_LOGS_FAILURE;
  payload: { error: unknown };
}

export type ExportAdminUserApiLogsActionTypes =
  | ExportAdminUserApiLogsRequestAction
  | ExportAdminUserApiLogsSuccessAction
  | ExportAdminUserApiLogsFailureAction;

export type ApiLogsActionTypes =
  | FetchApiLogsRequestAction
  | FetchApiLogsSuccessAction
  | FetchApiLogsFailureAction;
