import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-4">Welcome to the SourceID Admin Dashboard</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Manage Organisations</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add, edit, or remove client organisations
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Manage Customers</h3>
              <p className="text-sm text-gray-600 mt-1">View and manage customer accounts</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Role Management</h3>
              <p className="text-sm text-gray-600 mt-1">Configure user roles and permissions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">System Status</h2>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>All systems operational</span>
          </div>
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
