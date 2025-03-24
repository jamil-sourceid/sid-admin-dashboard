import React from 'react';
import DashboardLayout from '../../layouts/dashboard-layout';

const Settings: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="settings-module"
      pageTag="System"
      pageTitle="System Settings"
      pageDesc="Configure global settings for the SourceID platform"
    >
      <div className="settings-content">
        {/* Simple settings page with just a header */}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
