import React, { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../layouts/dashboard-layout';
import { Tabs, Input, Select, DatePicker } from 'antd';
import './style.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

// Import icons from assets instead of using placeholder URLs
import AllCustomersIcon from '../../assets/icons/allCustomers.svg';
import ActiveCustomersIcon from '../../assets/icons/activeCustomers.svg';
import InactiveCustomersIcon from '../../assets/icons/inactiveCustomers.svg';
import SearchIcon from '../../assets/icons/search.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import ViewIcon from '../../assets/icons/view.svg';

// Import Redux actions
import { fetchOrganisationsRequest } from '../../store/organisation/actions';
import { RootState } from '../../store/rootReducer';
import { AnyAction } from 'redux';

// Import components
import TableSkeleton from '../../components/table-skeleton';
import SourceIdPagination from '../../components/pagination';

const { RangePicker } = DatePicker;

// Use imported icons instead of placeholder URLs
const AllOrgs = AllCustomersIcon;
const ActiveOrgs = ActiveCustomersIcon;
const InactiveOrgs = InactiveCustomersIcon;
const Search = SearchIcon;
const Filter = FilterIcon;
const Plus = PlusIcon;
const View = ViewIcon;

interface OrganisationPillProps {
  state: string;
  image: string;
  amount: string;
}

const OrganisationPill: React.FC<OrganisationPillProps> = ({ state, image, amount }) => {
  return (
    <div className="customer-pill">
      <img src={image} alt={state} />
      <span className="state">{state}</span>
      <span className="amount">{amount}</span>
    </div>
  );
};

const Organisation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<[string | undefined, string | undefined]>([undefined, undefined]);
  const [mfaEnabled, setMfaEnabled] = useState<boolean | undefined>(undefined);
  const [filterVisible, setFilterVisible] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    data: organisations,
    loading,
    meta
  } = useSelector((state: RootState) => state.organisations);

  useEffect(() => {
    dispatch(fetchOrganisationsRequest({
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
      status: selectedStatus || undefined,
      startDate: dateRange[0],
      endDate: dateRange[1],
      mfaIsEnabled: mfaEnabled
    }) as unknown as AnyAction);
  }, [dispatch, currentPage, pageSize, selectedStatus, dateRange, mfaEnabled]);

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(fetchOrganisationsRequest({
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        status: selectedStatus || undefined,
        startDate: dateRange[0],
        endDate: dateRange[1],
        mfaIsEnabled: mfaEnabled
      }) as unknown as AnyAction);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
    // Reset the search and filters when changing tabs
    setCurrentPage(1);
    
    let newStatus = '';
    // Set status based on tab
    switch (key) {
      case '2': // Active Organisations
        newStatus = 'active';
        break;
      case '3': // Inactive Organisations
        newStatus = 'inactive';
        break;
      default: // All Organisations
        newStatus = '';
        break;
    }
    
    setSelectedStatus(newStatus);
    
    // Dispatch the action with the updated status
    dispatch(fetchOrganisationsRequest({
      page: 1,
      limit: pageSize,
      search: searchTerm,
      status: newStatus || undefined,
      startDate: dateRange[0],
      endDate: dateRange[1],
      mfaIsEnabled: mfaEnabled
    }) as unknown as AnyAction);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, pageSize: number): void => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([
        dates[0] ? dayjs(dates[0]).format('YYYY-MM-DD') : undefined,
        dates[1] ? dayjs(dates[1]).format('YYYY-MM-DD') : undefined
      ]);
    } else {
      setDateRange([undefined, undefined]);
    }
    setCurrentPage(1);
  };

  const toggleFilter = (): void => {
    setFilterVisible(!filterVisible);
  };

  const resetFilters = (): void => {
    setDateRange([undefined, undefined]);
    setMfaEnabled(undefined);
    setCurrentPage(1);
  };

  const activeOrganisations = organisations.filter((org) => org.status === 'active');
  const inactiveOrganisations = organisations.filter((org) => org.status === 'inactive');

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleAddNewOrganisation = (): void => {
    navigate('/dashboard/organisation/add-organisation');
  };

  const handleViewOrganisation = (id: string): void => {
    navigate(`/dashboard/organisation/edit-organisation/${id}`);
  };

  const renderOrganisationTable = (): ReactElement => (
    <div className="user-table">
      <div className="section-actions">
        <div className="input-container">
          <Input
            size="large"
            placeholder="Search for Organisations"
            prefix={<img src={Search} alt="" />}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="click-actions">
          <button className="btn-icon filter" onClick={toggleFilter}>
            <img src={Filter} alt="filter" />
            Filter
          </button>
          <button className="add-new-admin btn-icon" onClick={handleAddNewOrganisation}>
            <img src={Plus} alt="add new organisation" />
            Add New Organisation
          </button>
        </div>
      </div>

      {filterVisible && (
        <div className="filter-section">
          <div className="filter-options">
            <RangePicker 
              onChange={handleDateRangeChange}
              placeholder={['Start Date', 'End Date']}
              value={dateRange[0] && dateRange[1] ? [
                dayjs(dateRange[0]),
                dayjs(dateRange[1])
              ] : null}
            />
            <Select
              placeholder="MFA Status"
              value={mfaEnabled}
              onChange={(value): void => setMfaEnabled(value)}
              allowClear
              style={{ width: 200 }}
              options={[
                { value: true, label: 'MFA Enabled' },
                { value: false, label: 'MFA Disabled' }
              ]}
            />
            <button className="btn-clear" onClick={resetFilters}>
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
                <th>Name</th>
                <th>Industry</th>
                <th>Country</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>MFA</th>
                <th></th>
              </tr>
            </thead>
            {loading ? (
              <TableSkeleton rowCount={5} columnCount={7} loading={true} />
            ) : organisations.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    No organizations found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {organisations.map((org) => (
                  <tr key={org._id}>
                    <td>
                      <div className="customer-name">
                        <span>{org.name}</span>
                      </div>
                    </td>
                    <td>{org.industry}</td>
                    <td>{org.country}</td>
                    <td>{formatDate(org.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${org.status.toLowerCase()}`}>{org.status}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${org.mfaIsEnabled ? 'active' : 'inactive'}`}>
                        {org.mfaIsEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <img 
                        src={View} 
                        alt="View" 
                        className="view-icon"
                        onClick={(): void => handleViewOrganisation(org._id)} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {!loading && meta && meta.total > 0 && (
          <div className="table-footer">
            <div className="pagination-container" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <SourceIdPagination
                defaultCurrent={currentPage}
                total={meta.total}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout
      pageClass="organisation-module"
      pageTag="Management"
      pageTitle="Organisations"
      pageDesc="Manage client organisations and their settings"
    >
      <div className="customer-pills">
        <OrganisationPill
          state="All Organisations"
          image={AllOrgs}
          amount={meta ? String(meta.total) : '0'}
        />
        <OrganisationPill
          state="Active Organisations"
          image={ActiveOrgs}
          amount={String(activeOrganisations.length)}
        />
        <OrganisationPill
          state="Inactive Organisations"
          image={InactiveOrgs}
          amount={String(inactiveOrganisations.length)}
        />
      </div>

      <Tabs
        className="tabs"
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            label: 'All Organisations',
            key: '1',
            children: renderOrganisationTable(),
          },
          {
            label: 'Active Organisations',
            key: '2',
            children: renderOrganisationTable(),
          },
          {
            label: 'Inactive Organisations',
            key: '3',
            children: renderOrganisationTable(),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export default Organisation;
