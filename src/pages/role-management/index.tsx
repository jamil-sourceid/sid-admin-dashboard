import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const RoleManagement: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Role Management</h1>
        <p className="mb-4">Manage roles, permissions, and user access</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Roles</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create New Role
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Role Name</th>
                  <th className="py-3 px-4 text-left">Access Level</th>
                  <th className="py-3 px-4 text-left">Users</th>
                  <th className="py-3 px-4 text-left">Created Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Super Admin</td>
                  <td className="py-3 px-4">Full Access</td>
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4">2023-01-10</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">Organization Admin</td>
                  <td className="py-3 px-4">Limited Access</td>
                  <td className="py-3 px-4">12</td>
                  <td className="py-3 px-4">2023-01-15</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleManagement;
