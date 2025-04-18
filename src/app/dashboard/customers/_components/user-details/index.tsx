"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Skeleton } from 'antd';
import './style.css';
import { selectCustomer, selectCustomerLoading } from '@/store/customers/selectors';
import { Customer } from '@/store/customers/types';

const UserDetails: React.FC = () => {
  const customer = useSelector(selectCustomer) as Customer | null;
  const loading = useSelector(selectCustomerLoading) as boolean;

  if (loading) {
    return (
      <div className="loading-container">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!customer) {
    return <div>No customer data available.</div>;
  }

  const renderInfoItem = (label: string, value: string): React.ReactElement => (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <span className="info-value">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="user-details">
      <Card title="Personal Information" className="details-card">
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            {renderInfoItem('First Name', customer.firstName)}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Last Name', customer.lastName)}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Email', customer.primaryEmail)}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Phone', customer.primaryPhoneNumber || 'N/A')}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Country', customer.country)}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Status', customer.verified ? 'Verified' : 'Not Verified')}
          </Col>
        </Row>
      </Card>

      <Card title="Account Information" className="details-card">
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            {renderInfoItem('Customer ID', customer._id)}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Created At', new Date(customer.createdAt).toLocaleString())}
          </Col>
          <Col xs={24} sm={12}>
            {renderInfoItem('Updated At', new Date(customer.updatedAt).toLocaleString())}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserDetails;
