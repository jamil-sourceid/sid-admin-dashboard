import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Billing: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="billing-module"
      pageTag="Finance"
      pageTitle="Billing Management"
      pageDesc="Manage billing, invoices, and organization payments"
    >
      <div className="billing-content">{/* Simple billing page with just a header */}</div>
    </DashboardLayout>
  );
};

export default Billing;
