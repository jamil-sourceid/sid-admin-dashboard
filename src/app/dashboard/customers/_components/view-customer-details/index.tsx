"use client";

import React from 'react';
import { Tabs } from 'antd';
import './style.css';
import UserDetails from '../user-details';
import VerificationLog from '../verification-log';
import Identity from '../identity';
import { useRouter } from 'next/navigation';

const ViewCustomerDetails: React.FC = () => {
  const router = useRouter();
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || '1';

  const handleTabChange = (key: string): void => {
    router.replace(`?tab=${key}`);
  };

  return (
    <Tabs
      className="tabs"
      activeKey={activeTab}
      onChange={handleTabChange}
      items={[
        {
          label: 'User Details',
          key: '1',
          children: <UserDetails />,
        },
        {
          label: 'Identity',
          key: '2',
          children: <Identity />,
        },
        {
          label: 'Verification Log',
          key: '3',
          children: <VerificationLog />,
        },
      ]}
    />
  );
};

export default ViewCustomerDetails;
