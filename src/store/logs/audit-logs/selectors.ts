import { RootState } from "../../rootReducer";
import { AuditLog } from "./types";

export const selectAuditLogsData = (state: RootState): AuditLog[] =>
  state.auditLogs?.data || [];

export const selectAuditLogsLoading = (state: RootState): boolean =>
  state.auditLogs?.loading || false;

export const selectAuditLogsError = (state: RootState): string | null =>
  state.auditLogs?.error;

export const selectAuditLogsMeta = (
  state: RootState
): { page: number; limit: number; total: number; count: number } =>
  state.auditLogs?.meta ?? { page: 1, limit: 50, total: 0, count: 0 };

export const selectAuditLogsExportLoading = (state: RootState): boolean =>
  state.auditLogs?.exportLoading ?? false;

export const selectAuditLogsExportError = (state: RootState): string | null =>
  state.auditLogs?.exportError ?? null;
