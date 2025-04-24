/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/layouts/dashboard-layout';
import { useRouter, useParams } from 'next/navigation';
import './style.css';
import { Skeleton } from 'antd';
import ViewCustomerDetails from '../_components/view-customer-details';
import { AppDispatch } from '@/store';
import { selectCustomer, selectCustomerLoading } from '@/store/customers/selectors';
import { fetchCustomerRequest } from '@/store/customers/actions';
import { Customer } from '@/store/customers/types';

const CustomerDetails: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const customer = useSelector(selectCustomer) as Customer | null;
  const loading = useSelector(selectCustomerLoading) as boolean;

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerRequest(id));
    }
  }, [id, dispatch]);

  const handleBack = (): void => {
    router.push('/dashboard/customers');
  };

  const pageTitleContent = loading ? (
    <Skeleton.Input active size="small" />
  ) : (
    <p className="flex gap-3 items-center font-normal">
      {customer?.firstName + ' ' + customer?.lastName}
      <span className={`status-badge ${customer?.verified ? 'verified' : 'not-verified'}`}>
        {customer?.verified ? 'Verified' : 'Unverified'} User
      </span>
    </p>
  );

  return (
    <DashboardLayout
      pageClass="customer-details"
      pageTag="Customer Management"
      pageTitle="Customer Details"
      pageDesc="View and manage customer information, identity details, and verification status."
    >
      <div className="customer-header">{pageTitleContent}</div>

      <div className="header-actions">
        <div className="back-button" onClick={handleBack}>
          <img src="/assets/icons/arrow-left.svg" alt="" /> Back
        </div>
      </div>

      {customer && <ViewCustomerDetails />}
    </DashboardLayout>
  );
};

export default CustomerDetails;
