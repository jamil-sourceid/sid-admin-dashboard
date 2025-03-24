import React, { useState } from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';
import { Tabs, Input } from 'antd';
import './style.css';

// Import icons from assets instead of using placeholder URLs
import UserIcon from '../../assets/icons/user.svg';
import AllCustomersIcon from '../../assets/icons/allCustomers.svg';
import ActiveCustomersIcon from '../../assets/icons/activeCustomers.svg';
import InactiveCustomersIcon from '../../assets/icons/inactiveCustomers.svg';
import SearchIcon from '../../assets/icons/search.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import ViewIcon from '../../assets/icons/view.svg';

// Use imported icons instead of placeholder URLs
const AllCustomers = AllCustomersIcon;
const ActiveCustomers = ActiveCustomersIcon;
const InactiveCustomers = InactiveCustomersIcon;
const Search = SearchIcon;
const Filter = FilterIcon;
const Plus = PlusIcon;
const View = ViewIcon;

interface CustomerPillProps {
  state: string;
  image: string;
  amount: string;
}

const CustomerPill: React.FC<CustomerPillProps> = ({
  state,
  image,
  amount,
}) => {
  return (
    <div className="customer-pill">
      <img src={image} alt={state} />
      <span className="state">{state}</span>
      <span className="amount">{amount}</span>
    </div>
  );
};

interface Customer {
  name: string;
  image: string;
  email: string;
  organisation: string;
  status: string;
}

const Customers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
  };

  // Replace placeholder customer image with avatar
  const customerImage = UserIcon;

  const customers: Customer[] = [
    {
      name: 'John Doe',
      image: customerImage,
      email: 'john.doe@example.com',
      organisation: 'Example Corp',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      image: customerImage,
      email: 'jane.smith@test.com',
      organisation: 'Test Company',
      status: 'Inactive',
    },
    {
      name: 'Robert Johnson',
      image: customerImage,
      email: 'robert@acme.com',
      organisation: 'Acme Inc',
      status: 'Active',
    },
    {
      name: 'Emily Brown',
      image: customerImage,
      email: 'emily@global.com',
      organisation: 'Global Solutions',
      status: 'Active',
    },
    {
      name: 'Michael Wilson',
      image: customerImage,
      email: 'michael@techinnovators.com',
      organisation: 'Tech Innovators',
      status: 'Inactive',
    },
  ];

  return (
    <DashboardLayout
      pageClass="customers-module"
      pageTag="Management"
      pageTitle="Customers"
      pageDesc="Manage customer accounts and their information"
    >
      <div className="customer-pills">
        <CustomerPill state="All Customers" image={AllCustomers} amount="150" />
        <CustomerPill state="Active Customers" image={ActiveCustomers} amount="120" />
        <CustomerPill state="Inactive Customers" image={InactiveCustomers} amount="30" />
      </div>

      <Tabs
        className="tabs"
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            label: 'All Customers',
            key: '1',
            children: (
              <div className="user-table">
                <div className="section-actions">
                  <div className="input-container">
                    <Input
                      size="large"
                      placeholder="Search for Customers"
                      prefix={<img src={Search} alt="" />}
                    />
                  </div>
                  <div className="click-actions">
                    <button className="btn-icon filter">
                      <img src={Filter} alt="filter" />
                      Filter
                    </button>
                    <button className="add-new-admin btn-icon">
                      <img src={Plus} alt="add new customer" />
                      Add New Customer
                    </button>
                  </div>
                </div>

                <div className="table">
                  <div className="table-body">
                    <table>
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Email Address</th>
                          <th>Organisation</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer, i) => (
                          <tr key={i}>
                            <td>
                              <div className="customer-name">
                                <img src={customer.image} alt={customer.name} />
                                <span>{customer.name}</span>
                              </div>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.organisation}</td>
                            <td>
                              <span
                                className={`status-badge ${customer.status.toLowerCase()}`}
                              >
                                {customer.status}
                              </span>
                            </td>
                            <td>
                              <img
                                src={View}
                                alt="View"
                                style={{ cursor: 'pointer' }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-footer">
                    {/* Add pagination component here if available */}
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: 'Active Customers',
            key: '2',
            children: (
              <div className="user-table">
                {/* Same structure as above but filtered for active customers */}
              </div>
            ),
          },
          {
            label: 'Inactive Customers',
            key: '3',
            children: (
              <div className="user-table">
                {/* Same structure as above but filtered for inactive customers */}
              </div>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export default Customers;
