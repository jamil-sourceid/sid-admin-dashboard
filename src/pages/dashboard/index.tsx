import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="dashboard-module"
      pageTag="Overview"
      pageTitle="Admin Dashboard"
      pageDesc="Welcome to the SourceID Admin Dashboard"
    >
      <div className="dashboard-content">{/* Simple dashboard with just a header */}</div>
    </DashboardLayout>
  );
};

export default Dashboard;
