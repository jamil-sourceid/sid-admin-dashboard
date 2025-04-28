/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Tabs, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import SourceIdPagination from "@/components/pagination";
import "./style.css";

const FilterIcon = "/assets/icons/filter.svg";
const SearchIcon = "/assets/icons/search.svg";

interface CustomerPillProps {
  state: string;
  amount: string;
  pending?: string;
  pillKey: string;
}

const CustomerPill: React.FC<CustomerPillProps> = ({
  state,
  amount,
  pending,
  pillKey,
}) => {
  return (
    <div className="billing-pill">
      <h6 className="state">{state}</h6>
      <div className="space-y-3">
        <h4 className="amount">${amount}</h4>
        {pillKey === "totalRevenue" && (
          <p className="text-xs flex gap-0.5 items-center">
            <img
              src="/assets/icons/arrow-up.svg"
              alt="Arrow-up"
              className="arrow-up"
            />
            <span className="text-[#079455]">5.2%</span> from last month
          </p>
        )}
        {pending && (
          <h6 className="text-[#FF4D4F] text-xs">{pending} invoices Pending</h6>
        )}
      </div>
    </div>
  );
};

interface Invoice {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  invoiceNumber: string;
  type: string;
  plan: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

const Billing: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("1");
  const [searchString, setSearchString] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const total = 0;
  const View = "/assets/icons/view.svg";
  const Trash = "/assets/icons/trash-can.svg";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSearchString("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) setPageSize(newPageSize);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    router.push(`/dashboard/customers/${invoice._id}`);
  };

  const handleViewOrganisation = (id: string): void => {
    router.push(`/dashboard/billing/view-invoice/${id}`);
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(" ");
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  const invoices: Invoice[] = [
    {
      _id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      image: "",
      invoiceNumber: "123456m",
      type: "customer",
      plan: "basic",
      amount: "1,200",
      status: "Paid",
    },
    {
      _id: "2",
      firstName: "Bob",
      lastName: "Smith",
      image: "",
      invoiceNumber: "6999688844",
      type: "customer",
      plan: "premium",
      amount: "1,200",
      status: "Overdue",
    },
    {
      _id: "3",
      firstName: "Charlie",
      lastName: "Brown",
      image: "",
      invoiceNumber: "64858585994",
      type: "organisation",
      plan: "standard",
      amount: "1,200",
      status: "Pending",
    },
  ];

  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid");
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  );
  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  );

  const dynamicTabData = [
    paidInvoices.length > 0 && { label: "Paid Invoices", key: "1" },
    pendingInvoices.length > 0 && { label: "Pending Invoices", key: "2" },
    overdueInvoices.length > 0 && { label: "Overdue Invoices", key: "3" },
  ].filter(Boolean) as { label: string; key: string }[];

  const customerPillData = [
    { state: "Total Revenue", pillKey: "totalRevenue", amount: "24,500" },
    {
      state: "Pending Payment",
      pillKey: "payment",
      amount: "3,500",
      pending: pendingInvoices.length.toString(),
    },
    {
      state: "Overdue Invoices",
      pillKey: "overdue",
      amount: "1,200",
      pending: overdueInvoices.length.toString(),
    },
  ];

  const renderTableContent = (filteredInvoices: Invoice[]) => (
    <tbody>
      {filteredInvoices.map((invoice) => (
        <tr key={invoice._id}>
          <td>{invoice.invoiceNumber || "N/A"}</td>
          <td className="capitalize">{invoice.type || "N/A"}</td>
          <td>
            <div
              className="invoice-name cursor-pointer flex items-center gap-1"
              onClick={() => handleViewInvoice(invoice)}
            >
              {invoice.image ? (
                <img src={invoice.image} alt={invoice.firstName} />
              ) : (
                <div className="bg-[#231e54] rounded-full w-max p-1.5 px-2 text-white capitalize">
                  {getInitials(`${invoice.firstName} ${invoice.lastName}`)}
                </div>
              )}
              <span>{`${invoice.firstName} ${invoice.lastName}`}</span>
            </div>
          </td>
          <td>${invoice.amount}</td>
          <td className="capitalize">{invoice.plan} Plan</td>
          <td>
            <button
              onClick={() => handleViewInvoice(invoice)}
              className={`text-xs status-badge ${invoice.status.toLowerCase()}`}
            >
              {invoice.status}
            </button>
          </td>
          <td>
            <div className="flex gap-2">
              <img
                src={View}
                alt="View"
                className="view-icon"
                onClick={(): void => handleViewOrganisation("11")}
              />
              <img
                src={Trash}
                alt="bin"
                className="bin-icon"
                onClick={(): void => handleViewOrganisation("11")}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  const getFilteredInvoices = (key: string): Invoice[] => {
    switch (key) {
      case "1":
        return paidInvoices;
      case "2":
        return pendingInvoices;
      case "3":
        return overdueInvoices;
      default:
        return [];
    }
  };

  return (
    <DashboardLayout
      pageClass="billings-module"
      pageTag="Management"
      pageTitle="Billings"
      pageDesc="Measure your advertising ROI and track and report website traffic."
    >
      <div className="billing-pills">
        {customerPillData.map((data) => (
          <CustomerPill
            key={data.pillKey}
            state={data.state}
            amount={data.amount}
            pending={data.pending}
            pillKey={data.pillKey}
          />
        ))}
      </div>

      <Tabs
        className="tabs"
        activeKey={activeTab}
        onChange={handleTabChange}
        items={dynamicTabData.map(({ label, key }) => ({
          label,
          key,
          children: (
            <div className="user-table">
              <div className="section-actions">
                <div className="input-container">
                  <Input
                    size="large"
                    placeholder="Search..."
                    prefix={<img src={SearchIcon} alt="" />}
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
                    Filter
                  </button>
                  <button className="add-new-admin btn-icon">Export</button>
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
                        { value: true, label: "Verified" },
                        { value: false, label: "Not Verified" },
                      ]}
                    />
                    <button
                      className="btn-clear"
                      onClick={() => setCurrentPage(1)}
                    >
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
                        <th>Invoice Number</th>
                        <th>Account Type</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Subscription Plan</th>
                        <th>Payment Stats</th>
                        <th></th>
                      </tr>
                    </thead>
                    {renderTableContent(getFilteredInvoices(key))}
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
          ),
        }))}
      />
    </DashboardLayout>
  );
};

export default Billing;
