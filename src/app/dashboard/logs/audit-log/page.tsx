"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SourceIdPagination from "@/components/pagination";
import { DatePicker, Input, Select, Drawer } from "antd";
import "./style.css";

const { RangePicker } = DatePicker;

interface LogPillProps {
  state: string;
  amount: string;
}

interface Log {
  _id: string;
  date?: string;
  company?: string;
  role?: string;
  actionType: string;
  resource: string;
}

const LogPill: React.FC<LogPillProps> = ({ state, amount }) => (
  <div className="audit-pill">
    <h6 className="state">{state}</h6>
    <div className="space-y-3">
      <h4 className="amount">{amount}</h4>
    </div>
  </div>
);

const AuditLog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");

  const [dateRange, setDateRange] = useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const ViewIcon = "/assets/icons/view.svg";
  const ExportIcon = "/assets/icons/export.svg";
  const FilterIcon = "/assets/icons/filter.svg";
  const SearchIcon = "/assets/icons/search.svg";
  console.log(dateRange);
  // Dummy data for logs
  const auditLogs: Log[] = [
    {
      _id: "1",
      date: "1/9/2025, 08:02AM",
      company: "Providus Bank",
      role: "reviewer",
      actionType: "recover user",
      resource: "user profile",
    },
    {
      _id: "2",
      date: "1/9/2025, 08:02AM",
      company: "Providus Bank",
      role: "reviewer",
      actionType: "recover user",
      resource: "user profile",
    },
  ];

  const total = auditLogs.length;

  const LogPillData = [
    { state: "Total Audit Actions", pillKey: "totalRevenue", amount: "145" },
    { state: "All Audit Logs", pillKey: "payment", amount: "80" },
    { state: "High-Priority Logs", pillKey: "overdue", amount: "27" },
  ];

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleViewJson = (log: Log) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  const renderTableContent = () => (
    <tbody>
      {auditLogs.map((log) => (
        <tr key={log._id}>
          <td>{log.date || "N/A"}</td>
          <td className="capitalize">{log.company || "N/A"}</td>
          <td>Admin - {log.role}</td>
          <td>
            <button
              className={`text-xs status-badge ${log.actionType.toLowerCase()}`}
            >
              {log.actionType}
            </button>
          </td>
          <td className="capitalize">{log.resource}</td>
          <td>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => handleViewJson(log)}
            >
              <img src={ViewIcon} alt="View" className="view-icon" />
              <span>View in JSON</span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );

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
                prefix={<img src={SearchIcon} alt="search" />}
                value={searchString}
                onChange={handleSearchChange}
              />
            </div>
            <div className="click-actions">
              <Select
                placeholder="Action Type"
                allowClear
                className="custom-small-placeholder"
                style={{ width: 100 }}
                options={[
                  { value: "recover-user", label: "Recover User" },
                  { value: "delete-user", label: "Delete User" },
                ]}
                onChange={() => setCurrentPage(1)}
              />

              <RangePicker
                style={{ width: 150 }}
                onChange={(dates): void =>
                  setDateRange([
                    dates?.[0]?.format("YYYY-MM-DD"),
                    dates?.[1]?.format("YYYY-MM-DD"),
                  ])
                }
                placeholder={["Start Date", "End Date"]}
              />

              <Select
                placeholder="All Company"
                allowClear
                style={{ width: 120 }}
                options={[
                  { value: "providus-bank", label: "Providus Bank" },
                  { value: "access-bank", label: "Access Bank" },
                ]}
                onChange={() => setCurrentPage(1)}
              />

              <Select
                placeholder="Status"
                allowClear
                style={{ width: 80 }}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                onChange={() => setCurrentPage(1)}
              />

              <button
                className="filter btn-icon"
                onClick={() => setShowFilter(!showFilter)}
              >
                <img src={FilterIcon} alt="filter" />
                Filters
              </button>

              <button className="add-new-admin btn-icon">
                <img src={ExportIcon} alt="Export" className="view-icon" />
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
                    <th>Date & Time</th>
                    <th>Company</th>
                    <th>User Roles</th>
                    <th>Action Type</th>
                    <th>Resource</th>
                    <th></th>
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

      <Drawer
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={500}
      >
        {selectedLog &&
          (() => {
            const formattedDate = selectedLog.date || "";
            const [date, time] = formattedDate
              ? formattedDate.split(", ")
              : ["-", "-"];

            return (
              <div className="space-y-3">
                <p className="flex justify-between text-[#8C8C8C]">
                  Date <h6 className="text-[#262626]">{date}</h6>
                </p>
                <hr className="border-[#E9EAEB]" />

                <p className="flex justify-between text-[#8C8C8C]">
                  Time <h6 className="text-[#262626]">{time}</h6>
                </p>
                <hr className="border-[#E9EAEB]" />

                <p className="flex justify-between text-[#8C8C8C]">
                  Actions
                  <h6 className="capitalize">{selectedLog.actionType}</h6>
                </p>
                <hr className="border-[#E9EAEB]" />

                <div className="space-y-2">
                  {/* <p
                    className="flex justify-between text-[#8C8C8C] items-center cursor-pointer"
                    onClick={() => setShowRequestPayload(!showRequestPayload)}
                  >
                    Verification Request Payload
                    <span
                      className={`transition-transform duration-300 ${
                        showRequestPayload ? "rotate-180" : ""
                      }`}
                    >
                      <img
                        src="/assets/icons/arrow-down.svg"
                        alt="Toggle dropdown"
                      />
                    </span>
                  </p> */}
                  {/* {showRequestPayload && (
                    <JsonDataCard
                      verificationRequestPayload={
                        selectedLog.verificationRequestPayload as
                          | VerificationRequestPayload
                          | undefined
                      }
                      variant="request"
                    />
                  )} */}
                </div>

                <button
                  className="bg-[#231E54] text-white rounded-lg p-2 w-full mt-4 justify-center re-verify"
                  disabled
                >
                  Re-Verify
                </button>
              </div>
            );
          })()}
      </Drawer>
    </DashboardLayout>
  );
};

export default AuditLog;
