"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  exportAdminAuditLogsRequest,
  fetchAuditLogsRequest,
} from "@/store/logs/audit-logs/actions";
import {
  selectAuditLogsData,
  selectAuditLogsError,
  selectAuditLogsExportLoading,
  selectAuditLogsLoading,
  selectAuditLogsMeta,
} from "@/store/logs/audit-logs/selectors";
import { AppDispatch } from "@/store";
import type { AuditLog as AuditLogType } from "@/store/logs/audit-logs/types";

import "./style.css";
import { AuditLogTable } from "./_components/audit-log-table";
import { AuditLogStats } from "./_components/audit-log-stats";

const AuditLog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auditLogs = useSelector(selectAuditLogsData);
  const loading = useSelector(selectAuditLogsLoading);
  const error = useSelector(selectAuditLogsError);
  const meta = useSelector(selectAuditLogsMeta);
  const exportLoading = useSelector(selectAuditLogsExportLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [dateRange, setDateRange] = useState<[string?, string?]>([
    undefined,
    undefined,
  ]);
  const [openJsonModal, setOpenJsonModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLogType | null>(null);
  const [selectedActionType, setSelectedActionType] = useState<
    string | undefined
  >(undefined);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    actionBy: true,
    email: true,
    dateTime: true,
    actionType: true,
    comments: true,
  });

  useEffect(() => {
    dispatch(
      fetchAuditLogsRequest({
        page: currentPage,
        limit: pageSize,
        startDate: dateRange[0],
        endDate: dateRange[1],
        search: searchString,
        actionType: selectedActionType === "all" ? "" : selectedActionType,
      })
    );
  }, [
    currentPage,
    pageSize,
    dateRange,
    searchString,
    selectedActionType,
    dispatch,
  ]);

  const handlePageChange = (page: number, newPageSize: number): void => {
    if (pageSize !== newPageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (dates: unknown): void => {
    const dateArray = dates as
      | { format: (formatString: string) => string }[]
      | undefined;
    setDateRange([
      dateArray?.[0]?.format("YYYY-MM-DD"),
      dateArray?.[1]?.format("YYYY-MM-DD"),
    ]);
  };

  const handleExport = () => {
    const filter: Record<string, string> = {};

    if (searchString) filter.search = searchString;
    if (dateRange[0]) filter.startDate = dateRange[0];
    if (dateRange[1]) filter.endDate = dateRange[1];
    if (selectedActionType && selectedActionType !== "all") {
      filter.actionType = selectedActionType;
    }

    dispatch(
      exportAdminAuditLogsRequest({
        filter,
        selectFields: selectedFields,
        fileType: "pdf",
      })
    );

    setSelectedFields({
      actionBy: true,
      email: true,
      dateTime: true,
      actionType: true,
      comments: true,
    });
  };

  const handleViewJson = (log: AuditLogType): void => {
    setSelectedLog({
      ...log,
      objectBeforeUpdate:
        typeof log.objectBeforeUpdate === "object" &&
        log.objectBeforeUpdate !== null
          ? log.objectBeforeUpdate
          : {},
      objectAfterUpdate:
        typeof log.objectAfterUpdate === "object" &&
        log.objectAfterUpdate !== null
          ? log.objectAfterUpdate
          : {},
    });
    setOpenJsonModal(true);
  };

  const handleFieldChange = (field: string, checked: boolean) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  return (
    <DashboardLayout
      pageClass="audit-module"
      pageTag="Management"
      pageTitle="Audit Log"
      pageDesc="Activity Logs"
    >
      <div className="audit-log-container">
        <AuditLogStats />

        <AuditLogTable
          auditLogs={auditLogs}
          loading={loading}
          error={error}
          meta={meta}
          exportLoading={exportLoading}
          currentPage={currentPage}
          pageSize={pageSize}
          searchString={searchString}
          dateRange={dateRange}
          selectedActionType={selectedActionType}
          selectedFields={selectedFields}
          openJsonModal={openJsonModal}
          selectedLog={selectedLog}
          filterModalVisible={filterModalVisible}
          onPageChange={handlePageChange}
          onSearchChange={handleSearchChange}
          onActionTypeChange={setSelectedActionType}
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
          onViewJson={handleViewJson}
          onCloseJsonModal={() => setOpenJsonModal(false)}
          onOpenFilterModal={() => setFilterModalVisible(true)}
          onCloseFilterModal={() => setFilterModalVisible(false)}
          onFieldChange={handleFieldChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default AuditLog;
