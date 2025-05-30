import { RootState } from "../../rootReducer";
import { ApiLog } from "./types";

export const selectApiLogsData = (state: RootState): ApiLog[] =>
  state.apiLogs?.data || [];

export const selectApiLogsLoading = (state: RootState): boolean =>
  state.apiLogs?.loading || false;

export const selectApiLogsError = (state: RootState): string | null =>
  state.apiLogs?.error;

export const selectApiLogsMeta = (
  state: RootState
): { page: number; limit: number; total: number; count: number } =>
  state.apiLogs?.meta ?? { page: 1, limit: 50, total: 0, count: 0 };

export const selectApiLogsExportLoading = (state: RootState): boolean =>
  state.apiLogs?.exportLoading ?? false;
