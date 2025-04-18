"use client";

import React, { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import './style.css';
import { useRouter } from 'next/navigation';
import { countries } from '@/helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { addCustomerRequest, resetAddCustomerState } from '@/store/customers/actions';
import {
  selectAddCustomerLoading,
  selectAddCustomerSuccess,
  selectAddCustomerError,
} from '@/store/customers/selectors';

const { Option } = Select;

interface CustomerFormData {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
}

const AddNewCustomerForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux
  const loading = useSelector(selectAddCustomerLoading);
  const success = useSelector(selectAddCustomerSuccess);
  const error = useSelector(selectAddCustomerError);

  // Handle success and error states
  useEffect(() => {
    if (success) {
      message.success('Customer added successfully');
      router.push('/dashboard/customers');
      // Reset state after navigation
      dispatch(resetAddCustomerState());
    }

    if (error) {
      message.error(error);
    }
  }, [success, error, router, dispatch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAddCustomerState());
    };
  }, [dispatch]);

  const handleSubmit = (values: CustomerFormData): void => {
    dispatch(addCustomerRequest(values));
  };

  return (
    <div className="add-customer-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          country: 'United States',
          nationality: 'United States',
        }}
      >
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="form-row">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Email Address"
              name="primaryEmail"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="primaryPhoneNumber"
              rules={[{ required: true, message: 'Phone number is required' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Date of birth is required' }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: 'Nationality is required' }]}
            >
              <Select placeholder="Select nationality">
                {countries.map((country: string) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Address Information</h3>
          <div className="form-row">
            <Form.Item
              label="Address Line 1"
              name="address"
              rules={[{ required: true, message: 'Address is required' }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'City is required' }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Country is required' }]}
            >
              <Select placeholder="Select country">
                {countries.map((country: string) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postalCode"
              rules={[{ required: true, message: 'Postal code is required' }]}
            >
              <Input placeholder="Enter postal code" />
            </Form.Item>
          </div>
        </div>

        <div className="form-actions">
          <Button onClick={(): void => router.push('/dashboard/customers')}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Customer
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewCustomerForm;
