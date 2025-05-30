import { AuditLog } from "@/store/logs/audit-logs/types";

export interface LogPillProps {
  state: string;
  amount: string;
}

export interface Log {
  _id: string;
  date?: string;
  company?: string;
  apiType: string;
  application: string;
  endpoint: string;
  status: string;
}

export interface AuditLogTableProps {
  auditLogs: AuditLog[] | null;
  loading: boolean;
  error: unknown;
  meta: { count: number };
  exportLoading: boolean;
  currentPage: number;
  pageSize: number;
  searchString: string;
  dateRange: [string?, string?];
  selectedActionType: string | undefined;
  selectedFields: Record<string, boolean>;
  openJsonModal: boolean;
  selectedLog: AuditLog | null;
  filterModalVisible: boolean;
  onPageChange: (page: number, newPageSize: number) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onActionTypeChange: (value: string | undefined) => void;
  onDateRangeChange: (dates: unknown) => void;
  onExport: () => void;
  onViewJson: (log: AuditLog) => void;
  onCloseJsonModal: () => void;
  onOpenFilterModal: () => void;
  onCloseFilterModal: () => void;
  onFieldChange: (field: string, checked: boolean) => void;
}
