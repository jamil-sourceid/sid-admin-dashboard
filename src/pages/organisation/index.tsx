import React, { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../layouts/dashboard-layout';
import { Tabs, Input, Spin } from 'antd';
import './style.css';

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
import { Organization } from '../../store/organisation/types';
import { AnyAction } from 'redux';

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

  const dispatch = useDispatch();
  const {
    data: organisations,
    loading,
    error,
  } = useSelector((state: RootState) => state.organisations);

  useEffect(() => {
    dispatch(fetchOrganisationsRequest() as unknown as AnyAction);
  }, [dispatch]);

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const activeOrganisations = organisations.filter((org) => org.status === 'active');
  const inactiveOrganisations = organisations.filter((org) => org.status === 'inactive');

  // Filter organizations based on search term
  const filteredOrganisations = organisations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredActiveOrganisations = activeOrganisations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInactiveOrganisations = inactiveOrganisations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const renderOrganisationTable = (orgs: Organization[]): ReactElement => (
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
          <button className="btn-icon filter">
            <img src={Filter} alt="filter" />
            Filter
          </button>
          <button className="add-new-admin btn-icon">
            <img src={Plus} alt="add new organisation" />
            Add New Organisation
          </button>
        </div>
      </div>

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((org) => (
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
                    <img src={View} alt="View" style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
              {orgs.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                    No organizations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">{/* Add pagination component here if available */}</div>
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
          amount={String(organisations.length)}
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

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>
      ) : (
        <Tabs
          className="tabs"
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              label: 'All Organisations',
              key: '1',
              children: renderOrganisationTable(filteredOrganisations),
            },
            {
              label: 'Active Organisations',
              key: '2',
              children: renderOrganisationTable(filteredActiveOrganisations),
            },
            {
              label: 'Inactive Organisations',
              key: '3',
              children: renderOrganisationTable(filteredInactiveOrganisations),
            },
          ]}
        />
      )}
    </DashboardLayout>
  );
};

export default Organisation;
