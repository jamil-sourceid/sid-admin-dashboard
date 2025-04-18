"use client";

import React from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import './style.css';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

// Import components
import AddNewCustomerForm from '../_components/add-new-customer-form/index';

const AddCustomer: React.FC = () => {
  const router = useRouter();

  const handleBack = (): void => {
    router.push('/dashboard/customers');
  };

  return (
    <DashboardLayout
      pageClass="add-new-customer"
      pageTag="Customer Management"
      pageTitle="Add New Customer"
      pageDesc="Register a new customer account with personal information and identification details."
    >
      <div className="add-customer-content">
        <div className="header-actions">
          <div className="back-button" onClick={handleBack}>
            <ArrowLeftOutlined />
            <span>Back</span>
          </div>

          <div className="header-actions-right">
            {/* Additional header actions can be added here if needed */}
          </div>
        </div>

        <AddNewCustomerForm />
      </div>
    </DashboardLayout>
  );
};

export default AddCustomer;
