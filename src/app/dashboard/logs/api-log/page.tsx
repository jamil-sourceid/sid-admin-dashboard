"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SourceIdPagination from "@/components/pagination";
import { DatePicker, Input, Select } from "antd";
import "./style.css";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  selectApiLogsData,
  selectApiLogsError,
  selectApiLogsExportLoading,
  selectApiLogsLoading,
  selectApiLogsMeta,
} from "@/store/logs/api-logs/selectors";
import {
  exportAdminUserApiLogsRequest,
  fetchApiLogsRequest,
} from "@/store/logs/api-logs/actions";
import { LogPillProps } from "./model";
import ExportFieldSelectorModal from "./_components/filter-modal";
import TableSkeleton from "@/components/table-skeleton";

const { RangePicker } = DatePicker;

const LogPill: React.FC<LogPillProps> = ({ state, amount }) => (
  <div className="api-api-pill">
    <h6 className="state">{state}</h6>
    <div className="space-y-3">
      <h4 className="amount">{amount}</h4>
    </div>
  </div>
);

const ApiLog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apiLogs = useSelector(selectApiLogsData);
  const loading = useSelector(selectApiLogsLoading);
  const meta = useSelector(selectApiLogsMeta);
  const total = meta?.total ?? 0;
  const error = useSelector(selectApiLogsError);
  const exportLoading = useSelector(selectApiLogsExportLoading);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [dateRange, setDateRange] = useState<[string?, string?]>([
    undefined,
    undefined,
  ]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    company: true,
    application: true,
    apiType: true,
    endpoint: true,
    status: true,
  });

  const SearchIcon = "/assets/icons/search.svg";

  const LogPillData = [
    { state: "Total API Actions", pillKey: "totalRevenue", amount: "145" },
    { state: "All API Logs", pillKey: "payment", amount: "80" },
    { state: "High-Priority Logs", pillKey: "overdue", amount: "27" },
  ];

  useEffect(() => {
    dispatch(
      fetchApiLogsRequest({
        page: currentPage,
        limit: pageSize,
        search: searchString || undefined,
        status: selectedStatus,
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
    );
  }, [
    currentPage,
    pageSize,
    searchString,
    selectedStatus,
    dateRange,
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchString(e.target.value);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const filter: Record<string, string> = {};

    if (searchString) {
      filter.search = searchString;
    }

    if (dateRange[0]) {
      filter.startDate = dateRange[0];
    }

    if (dateRange[1]) {
      filter.endDate = dateRange[1];
    }

    if (selectedStatus && selectedStatus !== "all") {
      filter.status = selectedStatus;
    }

    dispatch(
      exportAdminUserApiLogsRequest({
        filter,
        selectFields: selectedFields,
        fileType: "pdf",
      })
    );

    setSelectedFields({
      company: true,
      application: true,
      apiType: true,
      endpoint: true,
      status: true,
    });
  };

  const renderTableContent = (): React.ReactNode => {
    if (loading) {
      return <TableSkeleton rowCount={3} columnCount={6} loading={true} />;
    }

    if (!apiLogs || apiLogs.length === 0 || error) {
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
        {apiLogs.map((log) => (
          <tr key={log._id}>
            <td>{String(log.url) || "N/A"}</td>
            <td>{log.method || "N/A"}</td>
            <td className="capitalize">{String(log.application) || "N/A"}</td>
            <td>
              <div
                className={`status-badge text-center ${
                  log?.statusCode?.toString().startsWith("20")
                    ? "success"
                    : "error"
                }`}
              >
                {log?.statusCode?.toString().startsWith("20")
                  ? "Success"
                  : "Failed"}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <DashboardLayout
      pageClass="api-api-module"
      pageTag="Management"
      pageTitle="API Log"
      pageDesc="Activity Logs"
    >
      <div className="api-api-log-container">
        <div className="api-api-pills">
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
                size="large"
                placeholder="Search..."
                prefix={<img src={SearchIcon} alt="search" />}
                value={searchString}
                onChange={handleSearchChange}
              />
            </div>

            <div className="click-actions">
              <Select
                placeholder="Status"
                value={selectedStatus}
                onChange={(value): void => setSelectedStatus(value)}
                options={[
                  { value: "All", label: "All" },
                  { value: "Success", label: "Success" },
                  { value: "Failed", label: "Failed" },
                ]}
              />

              <RangePicker
                onChange={(dates): void =>
                  setDateRange([
                    dates?.[0]?.format("YYYY-MM-DD"),
                    dates?.[1]?.format("YYYY-MM-DD"),
                  ])
                }
                placeholder={["Start Date", "End Date"]}
              />

              <button
                className="btn-icon filter"
                onClick={() => setFilterModalVisible(true)}
              >
                <img src="/assets/icons/filter.svg" alt="filter" />
                Filter
              </button>

              <button
                className="btn-icon filter"
                onClick={handleExport}
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
                    <th>End Point</th>
                    <th>API Type</th>
                    <th>Application</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {renderTableContent()}
              </table>
            </div>

            <div className="table-footer">
              <div className="pagination-container">
                <SourceIdPagination
                  defaultCurrent={currentPage}
                  total={total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportFieldSelectorModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedFields={selectedFields}
        onFieldChange={setSelectedFields}
      />
    </DashboardLayout>
  );
};

export default ApiLog;
