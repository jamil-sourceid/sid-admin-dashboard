/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Checkbox, DatePicker, Input, Modal, Select } from "antd";
import SourceIdPagination from "@/components/pagination";
import TableSkeleton from "@/components/table-skeleton";
import { formatDate } from "@/helpers";
import LogsModal from "../_components/log-update";
import { actionTypes } from "@/helpers/constants";
import { AuditLogTableProps } from "../../api-log/model";

const { RangePicker } = DatePicker;

const fieldLabels: Record<string, string> = {
  actionBy: "Action By",
  email: "Email",
  dateTime: "Date and Time",
  actionType: "Action Type",
  comments: "Comments",
};

export const AuditLogTable: React.FC<AuditLogTableProps> = ({
  auditLogs,
  loading,
  error,
  meta,
  exportLoading,
  currentPage,
  pageSize,
  searchString,
  selectedActionType,
  selectedFields,
  openJsonModal,
  selectedLog,
  filterModalVisible,
  onPageChange,
  onSearchChange,
  onActionTypeChange,
  onDateRangeChange,
  onExport,
  onViewJson,
  onCloseJsonModal,
  onOpenFilterModal,
  onCloseFilterModal,
  onFieldChange,
}) => {
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
                onClick={() => onViewJson(log)}
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
    <>
      <div className="user-table mt-10">
        <div className="section-actions">
          <div className="input-container">
            <Input
              placeholder="Search..."
              prefix={<img src="/assets/icons/search.svg" alt="search" />}
              value={searchString}
              onChange={onSearchChange}
            />
          </div>
          <div className="click-actions">
            <Select
              placeholder="Select..."
              allowClear
              value={selectedActionType}
              onChange={onActionTypeChange}
              options={actionTypes}
            />
            <RangePicker
              onChange={onDateRangeChange}
              placeholder={["Start Date", "End Date"]}
            />
            <button className="btn-icon filter" onClick={onOpenFilterModal}>
              <img src="/assets/icons/filter.svg" alt="filter" />
              Filter
            </button>
            <button
              className="btn-icon filter"
              onClick={onExport}
              disabled={exportLoading}
            >
              <img src="/assets/icons/export.svg" alt="export" />
              {exportLoading ? "Exporting..." : "Export"}
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
              onChange={onPageChange}
            />
          </div>
        </div>
      </div>

      <LogsModal
        open={openJsonModal}
        closeModal={onCloseJsonModal}
        objectAfterUpdate={selectedLog?.objectAfterUpdate || {}}
        objectBeforeUpdate={selectedLog?.objectBeforeUpdate || {}}
      />

      <Modal
        title="Select Fields to Include"
        open={filterModalVisible}
        onCancel={onCloseFilterModal}
        onOk={onCloseFilterModal}
        okText="Done"
        okButtonProps={{
          style: {
            backgroundColor: "#231e54",
            color: "#fff",
            borderColor: "#231e54",
          },
        }}
      >
        <div className="grid grid-cols-2">
          {Object.entries(selectedFields).map(([key, value]) => (
            <Checkbox
              key={key}
              checked={value}
              onChange={(e) => onFieldChange(key, e.target.checked)}
              style={{ marginBottom: 8 }}
            >
              {fieldLabels[key] ?? key}
            </Checkbox>
          ))}
        </div>
      </Modal>
    </>
  );
};
