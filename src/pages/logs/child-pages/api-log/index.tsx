import React from 'react';
import DashboardLayout from '../../../../layouts/dashboard-layout';

const ApiLog: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="api-log-module"
      pageTag="Logs"
      pageTitle="API Logs"
      pageDesc="Monitor API calls and responses across the platform"
    >
      <div className="api-log-content">{/* Simple API log page with just a header */}</div>
    </DashboardLayout>
  );
};

export default ApiLog;
