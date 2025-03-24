import React from 'react';
import DashboardLayout from '../../../../layouts/dashboard-layout';

const AuditLog: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
        <p className="mb-4">View and manage audit trails for all system operations</p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="border border-gray-300 rounded px-3 py-2 w-48">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                <select className="border border-gray-300 rounded px-3 py-2 w-48">
                  <option>All actions</option>
                  <option>Login</option>
                  <option>Create</option>
                  <option>Update</option>
                  <option>Delete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-48"
                  placeholder="Search by username"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Action</th>
                  <th className="py-3 px-4 text-left">Resource</th>
                  <th className="py-3 px-4 text-left">IP Address</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">2023-06-15 14:25:32</td>
                  <td className="py-3 px-4">admin@example.com</td>
                  <td className="py-3 px-4">Create</td>
                  <td className="py-3 px-4">Organization</td>
                  <td className="py-3 px-4">192.168.1.1</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">2023-06-15 13:10:05</td>
                  <td className="py-3 px-4">john@example.com</td>
                  <td className="py-3 px-4">Update</td>
                  <td className="py-3 px-4">User</td>
                  <td className="py-3 px-4">192.168.1.5</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
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

export default AuditLog;
