/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Tabs, Input, Select } from 'antd';
import './style.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

// Import components
import TableSkeleton from '@/components/table-skeleton';
import SourceIdPagination from '@/components/pagination';

// Import Redux actions and selectors
import { fetchAccountsRequest } from '@/store/customers/actions';
import { selectAccounts, selectAccountsLoading } from '@/store/customers/selectors';
import {
  selectOverviewData,
  selectOverviewLoading,
} from '@/store/dashboard/overview/selectors';
import { fetchOverviewRequest } from '@/store/dashboard/overview/actions';
import { Account } from '@/store/customers/types';
import { OverviewData } from '@/store/dashboard/overview/types';
import { AppDispatch } from '@/store';

// Use imported icons
const AllCustomers = '/assets/icons/allCustomers.svg';
const ActiveCustomers = '/assets/icons/activeCustomers.svg';
const InactiveCustomers = '/assets/icons/inactiveCustomers.svg';
const Search = '/assets/icons/search.svg';
const Plus = '/assets/icons/plus.svg';

interface CustomerPillProps {
  state: string;
  image: string;
  amount: number;
  loading: boolean;
}

const CustomerPill: React.FC<CustomerPillProps> = ({ state, image, amount, loading }) => {
  return (
    <div className="customer-pill">
      <img src={image} alt={state} />
      <span className="state">{state}</span>
      <span className="amount">{loading ? '...' : amount}</span>
    </div>
  );
};

const Customers: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState<string>('1');
  const [searchString, setSearchString] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterVerified, setFilterVerified] = useState<boolean | undefined>(undefined);

  const customers = useSelector(selectAccounts) as Account[];
  const isLoading = useSelector(selectAccountsLoading) as boolean;
  const overviewData = useSelector(selectOverviewData) as OverviewData;
  const isOverviewLoading = useSelector(selectOverviewLoading) as boolean;

  const total = overviewData?.totalCustomers || 0;

  useEffect(() => {
    const requestData: {
      type: string;
      page: number;
      limit: number;
      verified?: boolean;
      searchString?: string;
    } = {
      type: 'individual',
      page: currentPage,
      limit: pageSize,
    };

    if (activeTab === '2') requestData.verified = true;
    if (activeTab === '3') requestData.verified = false;

    // Apply filter if set
    if (filterVerified !== undefined) {
      requestData.verified = filterVerified;
    }

    if (searchString.trim() !== '') {
      requestData.searchString = searchString.trim();
    }

    dispatch(fetchAccountsRequest(requestData));
  }, [activeTab, dispatch, searchString, currentPage, pageSize, filterVerified]);

  useEffect(() => {
    dispatch(fetchOverviewRequest());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchString(e.target.value);
  };

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
    setSearchString('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, newPageSize?: number): void => {
    setCurrentPage(page);
    if (newPageSize) setPageSize(newPageSize);
  };

  const addNewCustomer = (): void => {
    router.push('/dashboard/customers/add-customer');
  };

  const handleViewCustomer = (customer: Account): void => {
    router.push(`/dashboard/customers/${customer._id}`);
  };

  const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  const renderTableContent = (): React.ReactNode => {
    if (isLoading) {
      return <TableSkeleton rowCount={3} columnCount={6} loading={true} />;
    }

    if (!customers || customers.length === 0) {
      return <TableSkeleton columnCount={6} loading={false} emptyText="No customers found." />;
    }

    return (
      <tbody>
        {customers.map((customer: Account, i: number) => (
          <tr key={i}>
            <td>
              <div
                className="customer-name cursor-pointer"
                onClick={(): void => handleViewCustomer(customer)}
              >
                {customer.image ? (
                  <img src={customer.image} alt={customer.firstName} />
                ) : (
                  <div className="bg-[#231e54] rounded-full w-max p-1.5 px-2 text-white capitalize">
                    {getInitials(customer.firstName + ' ' + customer.lastName)}
                  </div>
                )}
                <span>{customer.firstName + ' ' + customer.lastName}</span>
              </div>
            </td>
            <td>{customer.primaryEmail || 'N/A'}</td>
            <td>{customer.primaryPhoneNumber || 'N/A'}</td>
            <td>{customer.country}</td>
            <td>
              <span className={`status-badge ${customer.verified ? 'verified' : 'not-verified'}`}>
                {customer.verified ? 'Verified' : 'Not Verified'}
              </span>
            </td>
            <td>
              <button onClick={(): void => handleViewCustomer(customer)} className="text-xs">
                View details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const customerPillData = [
    {
      state: 'All Customers',
      image: AllCustomers,
      key: 'totalCustomers' as keyof OverviewData,
    },
    {
      state: 'Inactive Customers',
      image: InactiveCustomers,
      key: 'inactiveCustomers' as keyof OverviewData,
    },
    {
      state: 'Active Customers',
      image: ActiveCustomers,
      key: 'activeCustomers' as keyof OverviewData,
    },
  ];

  const tabData = [
    { label: 'All Customers', key: '1', verified: undefined },
    { label: 'Verified Customers', key: '2', verified: true },
    { label: 'Not Verified Customers', key: '3', verified: false },
  ];

  return (
    <DashboardLayout
      pageClass="customers-module"
      pageTag="Management"
      pageTitle="Customers"
      pageDesc="Manage customer accounts and their information"
    >
      <div className="customer-pills">
        {customerPillData.map(
          ({ state, image, key }): React.ReactElement => (
            <CustomerPill
              key={state}
              state={state}
              image={image}
              amount={overviewData?.[key] || 0}
              loading={isOverviewLoading}
            />
          )
        )}
      </div>

      <Tabs
        className="tabs"
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabData.map(
          ({ label, key }): { label: string; key: string; children: React.ReactNode } => ({
            label,
            key,
            children: (
              <div className="user-table">
                <div className="section-actions">
                  <div className="input-container">
                    <Input
                      size="large"
                      placeholder="Search for Customers"
                      prefix={<img src={Search} alt="" />}
                      value={searchString}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="click-actions">
                    <button
                      className="filter btn-icon"
                      onClick={(): void => setShowFilter(!showFilter)}
                    >
                      <img src={Search} alt="filter" />
                      Filter
                    </button>
                    <button className="add-new-admin btn-icon" onClick={addNewCustomer}>
                      <img src={Plus} alt="add new customer" />
                      Add New Customer
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
                        onChange={(value): void => {
                          setFilterVerified(value);
                          setCurrentPage(1);
                        }}
                        options={[
                          { value: true, label: 'Verified' },
                          { value: false, label: 'Not Verified' },
                        ]}
                      />
                      <button
                        className="btn-clear"
                        onClick={(): void => {
                          setFilterVerified(undefined);
                          setCurrentPage(1);
                        }}
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
                          <th>Customer</th>
                          <th>Email Address</th>
                          <th>Phone Number</th>
                          <th>Country</th>
                          <th>Status</th>
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
            ),
          })
        )}
      />
    </DashboardLayout>
  );
};

export default Customers;
