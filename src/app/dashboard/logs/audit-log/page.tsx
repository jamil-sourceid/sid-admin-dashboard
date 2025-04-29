"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SourceIdPagination from "@/components/pagination";
import { DatePicker, Input, Select } from "antd";
import "./style.css";
import { fetchAuditLogsRequest } from "@/store/logs/audit-logs/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuditLogsData,
  selectAuditLogsError,
  selectAuditLogsLoading,
  selectAuditLogsMeta,
} from "@/store/logs/audit-logs/selectors";
import { AppDispatch } from "@/store";
import TableSkeleton from "@/components/table-skeleton";
import { formatDate } from "@/helpers";
import LogsModal from "./log-update";
import { LogPillProps } from "./model";
import type { AuditLog } from "@/store/logs/audit-logs/types";
import { actionTypes } from "@/helpers/constants";

const { RangePicker } = DatePicker;

const LogPill: React.FC<LogPillProps> = ({ state, amount }) => (
  <div className="audit-pill">
    <h6 className="state">{state}</h6>
    <div className="space-y-3">
      <h4 className="amount">{amount}</h4>
    </div>
  </div>
);

const AuditLog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [dateRange, setDateRange] = useState<[string?, string?]>([
    undefined,
    undefined,
  ]);
  const [openJsonModal, setOpenJsonModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const [selectedActionType, setSelectedActionType] = useState<
    string | undefined
  >(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const auditLogs = useSelector(selectAuditLogsData);
  const loading = useSelector(selectAuditLogsLoading);
  const error = useSelector(selectAuditLogsError);
  const meta = useSelector(selectAuditLogsMeta);

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

  const handleViewJson = (log: AuditLog): void => {
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

  const LogPillData = [
    { state: "Total Audit Actions", pillKey: "totalRevenue", amount: "145" },
    { state: "All Audit Logs", pillKey: "payment", amount: "80" },
    { state: "High-Priority Logs", pillKey: "overdue", amount: "27" },
  ];

  const renderTableContent = () => {
    if (loading) {
      return <TableSkeleton rowCount={3} columnCount={6} loading={true} />;
    }
    if (!auditLogs || auditLogs.length === 0 || error) {
      return (
        <TableSkeleton
          columnCount={6}
          loading={false}
          emptyText="No logs found."
        />
      );
    }
    return (
      <tbody>
        {auditLogs.map((log) => (
          <tr key={log._id}>
            <td>{log.updatedAt ? formatDate(log.updatedAt) : "N/A"}</td>
            <td className="capitalize">
              {log.organization?.name ? log.organization.name : "N/A"}
            </td>
            <td>{log.actorType ? `Admin - ${log.actorType}` : "Admin"}</td>
            <td>
              <button
                className={`text-xs status-badge ${log.actionType.toLowerCase()}`}
              >
                {log.actionType}
              </button>
            </td>
            <td>
              <button
                onClick={() => handleViewJson(log)}
                disabled={!(log?.objectAfterUpdate || log?.objectBeforeUpdate)}
                className="flex gap-2 cursor-pointer text-nowrap disabled:opacity-50"
              >
                <img
                  src="/assets/icons/view.svg"
                  alt="View"
                  className="view-icon"
                />
                <span>View in JSON</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <DashboardLayout
      pageClass="audit-module"
      pageTag="Management"
      pageTitle="Audit Log"
      pageDesc="Activity Logs"
    >
      <div className="audit-log-container">
        <div className="audit-pills">
          {LogPillData.map((data) => (
            <LogPill
              key={data.pillKey}
              state={data.state}
              amount={data.amount}
            />
          ))}
        </div>

        <div className="user-table mt-10">
          <div className="section-actions">
            <div className="input-container">
              <Input
                placeholder="Search..."
                prefix={<img src="/assets/icons/search.svg" alt="search" />}
                value={searchString}
                onChange={handleSearchChange}
              />
            </div>

            <div className="click-actions">
              <Select
                placeholder="Select..."
                allowClear
                value={selectedActionType}
                onChange={(value): void => setSelectedActionType(value)}
                options={actionTypes}
              />

              <RangePicker
                style={{ width: 150 }}
                onChange={(dates) =>
                  setDateRange([
                    dates?.[0]?.format("YYYY-MM-DD"),
                    dates?.[1]?.format("YYYY-MM-DD"),
                  ])
                }
                placeholder={["Start Date", "End Date"]}
              />

              <button className="add-new-admin btn-icon">
                <img
                  src="/assets/icons/export.svg"
                  alt="Export"
                  className="view-icon"
                />
                Export
              </button>
            </div>
          </div>

          <div className="table">
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Company</th>
                    <th>User Roles</th>
                    <th>Action Type</th>
                    <th></th>
                  </tr>
                </thead>
                {renderTableContent()}
              </table>
            </div>

            <div className="table-footer">
              <SourceIdPagination
                defaultCurrent={currentPage}
                total={meta.count}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <LogsModal
        open={openJsonModal}
        closeModal={() => setOpenJsonModal(false)}
        objectAfterUpdate={selectedLog?.objectAfterUpdate || {}}
        objectBeforeUpdate={selectedLog?.objectBeforeUpdate || {}}
      />
    </DashboardLayout>
  );
};

export default AuditLog;
