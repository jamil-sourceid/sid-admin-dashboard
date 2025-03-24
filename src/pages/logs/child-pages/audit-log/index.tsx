import React from 'react';
import DashboardLayout from '../../../../layouts/dashboard-layout';

const AuditLog: React.FC = () => {
  return (
    <DashboardLayout
      pageClass="audit-log-module"
      pageTag="Logs"
      pageTitle="Audit Logs"
      pageDesc="View and manage audit trails for all system operations"
    >
      <div className="audit-log-content">
        {/* Simple audit log page with just a header */}
      </div>
    </DashboardLayout>
  );
};

export default AuditLog;
