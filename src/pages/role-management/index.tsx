import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const RoleManagement: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="role-management-module"
      pageTag="Management"
      pageTitle="Role Management"
      pageDesc="Manage roles, permissions, and user access"
    >
      <div className="role-management-content">
        {/* Simple role management page with just a header */}
      </div>
    </DashboardLayout>
  );
};

export default RoleManagement;
