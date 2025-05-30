import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getData, postData } from "../../../setup/config/api";
import { notify } from "../../../components/toast/utils";
import { AxiosError, AxiosResponse } from "axios";
import {
  FETCH_API_LOGS_REQUEST,
  FETCH_API_LOGS_SUCCESS,
  FETCH_API_LOGS_FAILURE,
  FetchApiLogsRequestAction,
  ApiLogResponse,
  EXPORT_ADMINUSER_API_LOGS_SUCCESS,
  EXPORT_ADMINUSER_API_LOGS_FAILURE,
  ExportAdminUserApiLogsRequestAction,
  EXPORT_ADMINUSER_API_LOGS_REQUEST,
} from "./types";

function* handleFetchApiLogs(action: FetchApiLogsRequestAction): SagaIterator {
  try {
    const queryParams = action.payload || {};

    const response = (yield call(() =>
      getData("/api-logs/admin", queryParams)
    )) as {
      data: ApiLogResponse;
      meta: { page: number; limit: number; total: number; count: number };
    };
    if (response?.data?.data) {
      yield put({
        type: FETCH_API_LOGS_SUCCESS,
        payload: {
          data: response.data.data,
          meta: response.meta || response.data.meta,
        },
      });
      return;
    }

    throw new Error(response?.data?.message || "Invalid response format");
  } catch (error: unknown) {
    let errMessage = "Failed to fetch API logs. Please try again.";

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_API_LOGS_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: "Error", text: errMessage }, "error");
  }
}

function* handleExportAdminUserApiLogs(
  action: ExportAdminUserApiLogsRequestAction
): SagaIterator {
  try {
    const response: AxiosResponse<Blob> = yield call(
      postData,
      "/api-logs/admin/export",
      action.payload,
      { responseType: "blob" }
    );

    const contentDisposition = response.headers?.["content-disposition"];
    let fileName = "Api-logs-export.pdf";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match?.[1]) {
        fileName = match[1];
      }
    }

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    yield put({ type: EXPORT_ADMINUSER_API_LOGS_SUCCESS });

    notify(
      {
        title: "Export Successful",
        text: "Your Api log file is ready for download.",
      },
      "success"
    );
  } catch (error: unknown) {
    let errMessage = "Failed to export Api logs. Please try again.";

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: EXPORT_ADMINUSER_API_LOGS_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: "Export failed", text: errMessage }, "error");
  }
}

export function* apiLogsSaga(): SagaIterator {
  yield all([
    takeLatest(FETCH_API_LOGS_REQUEST, handleFetchApiLogs),
    takeLatest(EXPORT_ADMINUSER_API_LOGS_REQUEST, handleExportAdminUserApiLogs),
  ]);
}
