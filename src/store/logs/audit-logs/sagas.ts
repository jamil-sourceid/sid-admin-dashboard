import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { getData } from "../../../setup/config/api";
import { notify } from "../../../components/toast/utils";
import { AxiosError } from "axios";
import {
  FETCH_AUDIT_LOGS_REQUEST,
  FETCH_AUDIT_LOGS_SUCCESS,
  FETCH_AUDIT_LOGS_FAILURE,
  FetchAuditLogsRequestAction,
  AuditLogResponse,
} from "./types";

function* handleFetchAuditLogs(
  action: FetchAuditLogsRequestAction
): SagaIterator {
  try {
    const queryParams = action.payload || {};

    const response = (yield call(() =>
      getData("/audit-logs/admin", queryParams)
    )) as {
      data: AuditLogResponse;
      meta: { page: number; limit: number; total: number; count: number };
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_AUDIT_LOGS_SUCCESS,
        payload: {
          data: response.data.data,
          meta: response.meta || response.data.meta,
        },
      });
      return;
    }

    throw new Error(response?.data?.message || "Invalid response format");
  } catch (error: unknown) {
    let errMessage = "Failed to fetch audit logs. Please try again.";

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_AUDIT_LOGS_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: "Error", text: errMessage }, "error");
  }
}

export function* auditLogsSaga(): SagaIterator {
  yield takeLatest(FETCH_AUDIT_LOGS_REQUEST, handleFetchAuditLogs);
}
