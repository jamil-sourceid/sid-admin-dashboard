"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { Card, Row, Col, Typography, Skeleton, Tag } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  IdcardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { AppDispatch, RootState } from '@/store';
import { fetchCustomerRequest } from '@/store/customers/actions';
import './style.css';

const { Title, Text } = Typography;

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { data: customer, loading } = useSelector((state: RootState) => state.customers.customer);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerRequest(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="user-details-container">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="user-details-container">
        <Title level={4}>No customer data available</Title>
      </div>
    );
  }

  const getStatusTag = (verified: boolean): React.ReactElement => {
    return verified ? <Tag color="success">Verified</Tag> : <Tag color="warning">Unverified</Tag>;
  };

  return (
    <div className="user-details-container">
      {/* Basic Information */}
      <Card className="user-details-card">
        <Title level={4} className="section-title">
          Basic Information
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <UserOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Full Name</Text>
                <div className="detail-value">{`${customer.firstName} ${customer.lastName}`}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <MailOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Email</Text>
                <div className="detail-value">{customer.primaryEmail}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <PhoneOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Phone Number</Text>
                <div className="detail-value">{customer.primaryPhoneNumber}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <GlobalOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Country</Text>
                <div className="detail-value">{customer.country}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Account Information */}
      <Card className="user-details-card">
        <Title level={4} className="section-title">
          Account Information
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <IdcardOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Customer ID</Text>
                <div className="detail-value">{customer._id}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <UserOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Verification Status</Text>
                <div className="detail-value">{getStatusTag(customer.verified)}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <CalendarOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Registration Date</Text>
                <div className="detail-value">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="detail-item">
              <ClockCircleOutlined className="detail-icon" />
              <div>
                <Text className="detail-label">Last Updated</Text>
                <div className="detail-value">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Additional information like identities can be added in another card if needed */}
      {customer.identities && customer.identities.length > 0 && (
        <Card className="user-details-card">
          <Title level={4} className="section-title">
            Identity Information
          </Title>
          <div>
            <Text type="secondary">
              {customer.identities.length}{' '}
              {customer.identities.length === 1 ? 'identity' : 'identities'} associated with this
              account. View the Identity tab for more details.
            </Text>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserDetails;
