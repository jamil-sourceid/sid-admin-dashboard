/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, Select, DatePicker, Upload, Spin, Divider } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DashboardLayout from '@/layouts/dashboard-layout';
import { RootState } from '@/store/rootReducer';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { getData } from '@/setup/config/api';
import './style.css';

const { Option } = Select;

// Country options with codes
interface CountryOption {
  value: string;
  label: string;
  code: string;
}

// Sample country list - in a real app, you would fetch this from an API
const countryOptions: CountryOption[] = [
  { value: 'US', label: 'United States', code: 'US' },
  { value: 'UK', label: 'United Kingdom', code: 'GB' },
  { value: 'CA', label: 'Canada', code: 'CA' },
  { value: 'AU', label: 'Australia', code: 'AU' },
  { value: 'NZ', label: 'New Zealand', code: 'NZ' },
  { value: 'NG', label: 'Nigeria', code: 'NG' },
  { value: 'GH', label: 'Ghana', code: 'GH' },
  { value: 'ZA', label: 'South Africa', code: 'ZA' },
];

// Sample roles and groups for dropdowns
const sampleRoles = [
  { value: '6553a47b6c2031cc7dad3c5a', label: 'Admin' },
  { value: '6553a47b6c2031cc7dad3c5b', label: 'Manager' },
  { value: '6553a47b6c2031cc7dad3c5c', label: 'User' },
  { value: '6553a47b6c2031cc7dad3c5d', label: 'Supervisor' }
];

const sampleGroups = [
  { value: '6553a47b6c2031cc7dad3c5e', label: 'Finance Department' },
  { value: '6553a47b6c2031cc7dad3c5f', label: 'Human Resources' },
  { value: '6553a47b6c2031cc7dad3c60', label: 'IT Department' },
  { value: '6553a47b6c2031cc7dad3c61', label: 'Operations' }
];

// Interface for role and group objects (keeping for reference)
interface Role {
  _id: string;
  name: string;
  description: string;
}

interface Group {
  _id: string;
  name: string;
  description: string;
}

// Staff interface matching the requested schema
interface StaffMember {
  _id?: string;
  title: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  photo?: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  organization: string;
  countryCode?: string;
}

// Define form values
interface FormValues {
  title: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  organization: string;
  country?: string;
  countryCode?: string;
}

const EditStaff: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ id?: string; orgId?: string }>() || {};
  const id = params.id;
  const orgId = params.orgId;
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isEditMode = !!id;

  // Get organization data from redux
  const { data: organizations } = useSelector((state: RootState) => state.organisations);
  const organization = organizations.find((org) => org._id === orgId);

  // In a real app, you would fetch the staff member's data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      // This would be an API call to fetch staff data
      // For now, just simulate loading and set dummy data
      setTimeout(() => {
        const dummyStaffData: StaffMember = {
          _id: id,
          title: 'Head Manager',
          firstName: 'Camilla',
          lastName: 'Rimdans',
          middleName: '',
          phoneNumber: '+2349139369457',
          email: 'camilla.rimdans@ubagroup.com',
          dateOfBirth: '2020-04-03T18:06:06.668Z',
          gender: 'female',
          organization: orgId || '67eecdf7166ff3ec74e36f49',
          countryCode: 'NG'
        };

        form.setFieldsValue({
          ...dummyStaffData,
          dateOfBirth: dayjs(dummyStaffData.dateOfBirth),
          country: 'NG', // Set country based on country code
        });
        setImageUrl(dummyStaffData.photo || '');
        setLoading(false);
      }, 1000);
    } else if (orgId) {
      // If adding a new staff member with preselected organization
      form.setFieldsValue({
        organization: orgId,
      });
    }
  }, [form, id, isEditMode, orgId]);

  // Handle form submission
  const handleSubmit = (values: FormValues): void => {
    setLoading(true);

    // Format date to ISO string
    const formattedDateOfBirth = values.dateOfBirth 
      ? typeof values.dateOfBirth === 'string' 
        ? values.dateOfBirth
        : (values.dateOfBirth as any).toISOString()
      : '';

    const formattedValues: StaffMember = {
      ...values,
      dateOfBirth: formattedDateOfBirth,
      photo: imageUrl,
    };

    // In a real app, this would call your API endpoint
    // API path would be PATCH /v1/api/staff/admin/{staffId} for updates
    // or POST /v1/api/staff/admin for creating new staff
    console.log('Saving staff member:', formattedValues);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate back after successful save
      handleBack();
    }, 1000);
  };

  // Handle image upload
  const handleImageUpload = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === 'done') {
      // In a real scenario, you would get the URL from the server response
      // For now, we'll simulate it with a placeholder URL
      setImageUrl('https://example.com/uploaded-profile.jpg');
    }
  };

  const handleBack = (): void => {
    // Navigate back to the organization page if coming from there
    if (orgId) {
      router.push(`/dashboard/organisation/edit-organisation/${orgId}?tab=staff`);
    } else {
      router.push('/dashboard/organisation');
    }
  };

  // Handle country selection to automatically set country code
  const handleCountryChange = (value: string): void => {
    // Find the country option with the selected value
    const country = countryOptions.find((option) => option.value === value);

    if (country) {
      // Set the country code field
      form.setFieldsValue({ countryCode: country.code });
    }
  };

  const pageTitle = isEditMode ? 'Edit Staff Member' : 'Add New Staff Member';
  const pageDesc = isEditMode
    ? 'Update staff member details'
    : 'Add new staff member to the organization';

  if (loading && isEditMode) {
    return (
      <DashboardLayout
        pageClass="edit-staff-module"
        pageTag="Staff Management"
        pageTitle={pageTitle}
        pageDesc={pageDesc}
      >
        <div className="edit-staff-content">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageClass="edit-staff-module"
      pageTag="Staff Management"
      pageTitle={pageTitle}
      pageDesc={pageDesc}
    >
      <div className="edit-staff-content">
        <div className="header-actions">
          <div className="back-button" onClick={handleBack}>
            <ArrowLeftOutlined />
            <span>Back</span>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="edit-staff-form"
          initialValues={{}}
        >
          <div className="section">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="input-container">
                <Form.Item
                  label="First Name *"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter first name' }]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item label="Middle Name" name="middleName">
                  <Input placeholder="Enter middle name (optional)" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Last Name *"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter last name' }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Email Address *"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter email address' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Country *"
                  name="country"
                  rules={[{ required: true, message: 'Please select country' }]}
                >
                  <Select
                    placeholder="Select country"
                    onChange={handleCountryChange}
                    showSearch
                    optionFilterProp="children"
                  >
                    {countryOptions.map((country) => (
                      <Option key={country.value} value={country.value}>
                        {country.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Country Code *"
                  name="countryCode"
                  rules={[{ required: true, message: 'Please select country code' }]}
                >
                  <Select placeholder="Select country code">
                    {countryOptions.map((country) => (
                      <Option key={country.code} value={country.code}>
                        {country.code} - {country.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Phone Number *"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Please enter phone number' },
                    { 
                      pattern: /^\+[0-9]{1,}$/, 
                      message: "Phone number must be in international format (e.g., +123456789)" 
                    }
                  ]}
                >
                  <Input placeholder="Enter phone number in international format (e.g., +123456789)" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Date of Birth *"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please select date of birth' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Job Title *"
                  name="title"
                  rules={[{ required: true, message: 'Please enter job title' }]}
                >
                  <Input placeholder="Enter job title" />
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Gender *"
                  name="gender"
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Select placeholder="Select gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="input-container">
                <Form.Item
                  label="Organization *"
                  name="organization"
                  rules={[{ required: true, message: 'Please select organization' }]}
                >
                  {isEditMode || orgId ? (
                    <>
                      <Input 
                        placeholder="Organization" 
                        value={organization?.name || ""}
                        disabled
                      />
                      <Input type="hidden" value={orgId} />
                    </>
                  ) : (
                    <Select placeholder="Select organization">
                      {organizations.map((org) => (
                        <Option key={org._id} value={org._id}>
                          {org.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>

          <Divider className="section-divider" />

          <div className="section">
            <h2>Profile Picture</h2>
            <div className="profile-picture-container">
              <Form.Item label="Profile Photo" name="photo">
                <div className="profile-picture-uploader">
                  <Upload
                    name="photo"
                    listType="picture"
                    className="logo-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
                    onChange={handleImageUpload}
                  >
                    <Button icon={<UploadOutlined />} className="profile-picture-upload-button">
                      {imageUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
                    </Button>
                  </Upload>
                  {imageUrl && (
                    <img src={imageUrl} alt="Profile" className="profile-picture-preview" />
                  )}
                </div>
              </Form.Item>
            </div>
          </div>

          <div className="form-actions">
            <Button onClick={handleBack}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEditMode ? 'Save Changes' : 'Create Staff Member'}
            </Button>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default EditStaff;
