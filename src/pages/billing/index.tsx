import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Billing: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Billing Management</h1>
        <p className="mb-4">Manage billing, invoices, and organization payments</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold text-blue-600">$256,890.45</p>
            <p className="text-sm text-gray-500 mt-2">Current monthly revenue</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Active Subscriptions</h2>
            <p className="text-3xl font-bold text-green-600">34</p>
            <p className="text-sm text-gray-500 mt-2">Across 12 organizations</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Pending Invoices</h2>
            <p className="text-3xl font-bold text-amber-600">7</p>
            <p className="text-sm text-gray-500 mt-2">Total $12,450.00</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Invoices</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Generate Invoice
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Invoice ID</th>
                  <th className="py-3 px-4 text-left">Organization</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">INV-2023-0045</td>
                  <td className="py-3 px-4">Example Corp</td>
                  <td className="py-3 px-4">$4,500.00</td>
                  <td className="py-3 px-4">2023-06-01</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                    <button className="text-green-600 hover:text-green-800">Download</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">INV-2023-0044</td>
                  <td className="py-3 px-4">Test Company</td>
                  <td className="py-3 px-4">$2,800.00</td>
                  <td className="py-3 px-4">2023-05-15</td>
                  <td className="py-3 px-4">
                    <span className="bg-amber-100 text-amber-700 rounded-full px-2 py-1 text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                    <button className="text-green-600 hover:text-green-800">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Subscription Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
              <h3 className="font-bold text-lg mb-2">Basic Plan</h3>
              <p className="text-2xl font-bold mb-4">
                $499<span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="text-gray-600 mb-4">Suitable for small organizations</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Edit Plan
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
              <h3 className="font-bold text-lg mb-2">Professional Plan</h3>
              <p className="text-2xl font-bold mb-4">
                $999<span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="text-gray-600 mb-4">Ideal for medium-sized companies</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Edit Plan
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
              <h3 className="font-bold text-lg mb-2">Enterprise Plan</h3>
              <p className="text-2xl font-bold mb-4">
                $2,499<span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="text-gray-600 mb-4">For large enterprise clients</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Edit Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
