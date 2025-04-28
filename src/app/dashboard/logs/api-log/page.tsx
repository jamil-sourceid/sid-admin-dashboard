"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SourceIdPagination from "@/components/pagination";
import { Input, Select } from "antd";
import "./style.css";

interface LogPillProps {
  state: string;
  amount: string;
}

interface Log {
  _id: string;
  date?: string;
  company?: string;
  apiType: string;
  application: string;
  endpoint: string;
  status: string;
}

const LogPill: React.FC<LogPillProps> = ({ state, amount }) => (
  <div className="audit-api-pill">
    <h6 className="state">{state}</h6>
    <div className="space-y-3">
      <h4 className="amount">{amount}</h4>
    </div>
  </div>
);

const ApiLog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");

  const ExportIcon = "/assets/icons/export.svg";
  const FilterIcon = "/assets/icons/filter.svg";
  const SearchIcon = "/assets/icons/search.svg";

  const apiLogs: Log[] = [
    {
      _id: "1",
      date: "1/9/2025, 08:02AM",
      company: "Providus Bank",
      apiType: "recover user",
      application: "Web",
      endpoint: "prod-api-key-providus",
      status: "Success",
    },
    {
      _id: "2",
      date: "1/9/2025, 08:02AM",
      company: "Providus Bank",
      apiType: "recover user",
      application: "Mobile App",
      endpoint: "prod-api-key-providus",
      status: "Success",
    },
  ];

  const total = apiLogs.length;

  const LogPillData = [
    { state: "Total API Actions", pillKey: "totalRevenue", amount: "145" },
    { state: "All API Logs", pillKey: "payment", amount: "80" },
    { state: "High-Priority Logs", pillKey: "overdue", amount: "27" },
  ];

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const renderTableContent = () => (
    <tbody>
      {apiLogs.map((log) => (
        <tr key={log._id}>
          <td>{log.endpoint}</td>
          <td>{log.date || "N/A"}</td>
          <td className="capitalize">{log.company || "N/A"}</td>
          <td>
            <button
              className={`text-xs status-badge ${log.apiType.toLowerCase()}`}
            >
              {log.apiType}
            </button>
          </td>
          <td className="capitalize">{log.application}</td>

          <td>
            <button
              className={`text-xs status-badge ${log.status.toLowerCase()}`}
            >
              {log.status}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <DashboardLayout
      pageClass="audit-api-module"
      pageTag="Management"
      pageTitle="API Log"
      pageDesc="Activity Logs"
    >
      <div className="audit-api-log-container">
        <div className="audit-api-pills">
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
              <button
                className="filter btn-icon"
                onClick={() => setShowFilter(!showFilter)}
              >
                <img src={FilterIcon} alt="filter" />
                Filters
              </button>
              <button className="add-new-admin btn-icon">
                <img src={ExportIcon} alt="View" className="view-icon" />
                Export
              </button>
            </div>
          </div>

          {showFilter && (
            <div className="filter-section">
              <div className="filter-options">
                <Select
                  placeholder="Verification Status"
                  allowClear
                  style={{ width: 200 }}
                  onChange={() => setCurrentPage(1)}
                  options={[
                    { value: "verified", label: "Verified" },
                    { value: "not-verified", label: "Not Verified" },
                  ]}
                />
                <button className="btn-clear" onClick={() => setCurrentPage(1)}>
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          <div className="table">
            <div className="table-body">
              <table>
                <thead>
                  <tr>
                    <th>End Point</th>

                    <th>Create Date & Time</th>
                    <th>Company</th>
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
    </DashboardLayout>
  );
};

export default ApiLog;
