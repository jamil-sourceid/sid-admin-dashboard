import {
  FETCH_API_LOGS_REQUEST,
  FETCH_API_LOGS_SUCCESS,
  FETCH_API_LOGS_FAILURE,
  ApiLogsActionTypes,
  ApiLogsState,
  ExportAdminUserApiLogsActionTypes,
  EXPORT_ADMINUSER_API_LOGS_REQUEST,
  EXPORT_ADMINUSER_API_LOGS_SUCCESS,
  EXPORT_ADMINUSER_API_LOGS_FAILURE,
} from "./types";

const initialState: ApiLogsState = {
  data: [],
  loading: false,
  error: null,
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    count: 0,
  },
  exportLoading: false,
  exportError: null,
};

type AdminApiLogsActions =
  | ApiLogsActionTypes
  | ExportAdminUserApiLogsActionTypes;

const apiLogsReducer = (
  state = initialState,
  action: AdminApiLogsActions
): ApiLogsState => {
  switch (action.type) {
    case FETCH_API_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_API_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta || state.meta,
        error: null,
      };
    case FETCH_API_LOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case EXPORT_ADMINUSER_API_LOGS_REQUEST:
      return {
        ...state,
        exportLoading: true,
        exportError: null,
      };

    case EXPORT_ADMINUSER_API_LOGS_SUCCESS:
      return {
        ...state,
        exportLoading: false,
      };

    case EXPORT_ADMINUSER_API_LOGS_FAILURE:
      return {
        ...state,
        exportLoading: false,
        exportError:
          action.payload.error instanceof Error
            ? action.payload.error.message
            : String(action.payload.error),
      };
    default:
      return state;
  }
};

export default apiLogsReducer;
