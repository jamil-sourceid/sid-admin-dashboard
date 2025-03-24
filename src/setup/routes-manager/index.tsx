import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import NoneProtectedRoute from './None-ProtectedRoute'; // Import None ProtectedRoute component
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component

// pages
import SignIn from 'pages/sign-in';
import Dashboard from 'pages/dashboard';
import Organisation from 'pages/organisation';
import AddOrganisation from 'pages/organisation/add-organisation';
import EditOrganisation from 'pages/organisation/edit-organisation';
import Customers from 'pages/customers';
import RoleManagement from 'pages/role-management';
import AuditLog from 'pages/logs/child-pages/audit-log';
import ApiLog from 'pages/logs/child-pages/api-log';
import Billing from 'pages/billing';
import Settings from 'pages/settings';

const RoutesManager: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<NoneProtectedRoute />}>
          <Route index element={<SignIn />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="organisation">
              <Route index element={<Organisation />} />
              <Route path="add-organisation" element={<AddOrganisation />} />
              <Route path="edit-organisation/:id" element={<EditOrganisation />} />
            </Route>
            <Route path="customers" element={<Customers />} />

            <Route path="role-management">
              <Route index element={<RoleManagement />} />
            </Route>

            <Route path="logs">
              <Route path="audit-log" element={<AuditLog />} />
              <Route path="api-log" element={<ApiLog />} />
            </Route>

            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesManager;
