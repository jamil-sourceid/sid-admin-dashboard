import React from 'react';
import DashboardLayout from '../../../../layouts/dashboard-layout';

const ApiLog: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">API Logs</h1>
        <p className="mb-4">Monitor API calls and responses across the platform</p>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="border border-gray-300 rounded px-3 py-2 w-48">
                  <option>All</option>
                  <option>Success (200)</option>
                  <option>Created (201)</option>
                  <option>Bad Request (400)</option>
                  <option>Unauthorized (401)</option>
                  <option>Forbidden (403)</option>
                  <option>Not Found (404)</option>
                  <option>Server Error (500)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-48"
                  placeholder="Filter by endpoint"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <select className="border border-gray-300 rounded px-3 py-2 w-48">
                  <option>All Organizations</option>
                  <option>Example Corp</option>
                  <option>Test Company</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">Organization</th>
                  <th className="py-3 px-4 text-left">Method</th>
                  <th className="py-3 px-4 text-left">Endpoint</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Response Time</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">2023-06-15 14:32:15</td>
                  <td className="py-3 px-4">Example Corp</td>
                  <td className="py-3 px-4">POST</td>
                  <td className="py-3 px-4">/api/v1/users</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">
                      200 OK
                    </span>
                  </td>
                  <td className="py-3 px-4">125ms</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">2023-06-15 14:30:45</td>
                  <td className="py-3 px-4">Test Company</td>
                  <td className="py-3 px-4">GET</td>
                  <td className="py-3 px-4">/api/v1/organizations/5</td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs">
                      404 Not Found
                    </span>
                  </td>
                  <td className="py-3 px-4">78ms</td>
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

export default ApiLog;
