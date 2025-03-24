import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Settings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">System Settings</h1>
        <p className="mb-4">Configure global settings for the SourceID platform</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Rate Limit</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="border border-gray-300 rounded px-3 py-2 w-24 mr-2"
                  defaultValue="1000"
                />
                <span>requests per minute</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Timeout</label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="border border-gray-300 rounded px-3 py-2 w-24 mr-2"
                  defaultValue="30"
                />
                <span>seconds</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key Expiration
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="border border-gray-300 rounded px-3 py-2 w-24 mr-2"
                  defaultValue="90"
                />
                <span>days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Timeout
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="border border-gray-300 rounded px-3 py-2 w-24 mr-2"
                  defaultValue="30"
                />
                <span>minutes</span>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Enforce Two-Factor Authentication</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Log All Admin Actions</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Enforce Strong Password Policy</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>

          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Send New Organization Notifications</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Send New Admin Account Notifications</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Send Failed Login Attempt Notifications</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Send API Key Creation Notifications</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
