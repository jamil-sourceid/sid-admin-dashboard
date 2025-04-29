import {
  FETCH_AUDIT_LOGS_REQUEST,
  FETCH_AUDIT_LOGS_SUCCESS,
  FETCH_AUDIT_LOGS_FAILURE,
  AuditLogsActionTypes,
  AuditLogsState,
} from "./types";

const initialState: AuditLogsState = {
  data: [],
  loading: false,
  error: null,
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    count: 0,
  },
};

const auditLogsReducer = (
  state = initialState,
  action: AuditLogsActionTypes
): AuditLogsState => {
  switch (action.type) {
    case FETCH_AUDIT_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AUDIT_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta || state.meta,
        error: null,
      };
    case FETCH_AUDIT_LOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default auditLogsReducer;
