/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Skeleton,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DashboardLayout from "@/layouts/dashboard-layout";
import { AnyAction } from "redux";
import "./style.css";
import { 
  selectOrgs,
  selectStaffCreateLoading,
  selectStaffCreateSuccess,
  selectStaffCreateError
} from "@/store/organisation/selectors";
import { 
  createStaffRequest,
  resetCreateStaffState
} from "@/store/organisation/actions";
import dayjs from "dayjs";

const { Option } = Select;

// Define interface for form data
interface StaffFormValues {
  title: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  organization: string;
}

const AddStaff: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgId = searchParams?.get('orgId') || "";

  // Get organizations from Redux store
  const organizations = useSelector(selectOrgs);
  const organization = organizations.find((org) => org._id === orgId);
  
  // Get staff creation state from Redux
  const submitLoading = useSelector(selectStaffCreateLoading);
  const createSuccess = useSelector(selectStaffCreateSuccess);
  const createError = useSelector(selectStaffCreateError);

  useEffect(() => {
    // Set the organization field if orgId is provided
    if (orgId) {
      form.setFieldsValue({
        organization: orgId,
      });
    }
  }, [form, orgId]);

  // Reset create staff state when component mounts
  useEffect(() => {
    dispatch(resetCreateStaffState() as unknown as AnyAction);
  }, [dispatch]);

  // Navigate back to organization page on successful creation
  useEffect(() => {
    if (createSuccess) {
      message.success("Staff created successfully!");
      router.push(`/dashboard/organisation/edit-organisation/${orgId}?tab=staff`);
    }
  }, [createSuccess, router, orgId]);

  // Show error message if creation fails
  useEffect(() => {
    if (createError) {
      message.error(createError);
    }
  }, [createError]);

  const handleSubmit = (values: StaffFormValues): void => {
    // Format date to ISO string
    const formattedValues = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
      // Add roles array with default value for CreateStaffPayload compatibility
      roles: ['staff'],
    };

    // Dispatch action to create staff
    dispatch(createStaffRequest(formattedValues) as unknown as AnyAction);
  };

  const handleCancel = (): void => {
    router.push(`/dashboard/organisation/edit-organisation/${orgId}?tab=staff`);
  };

  const handleBack = (): void => {
    router.push(`/dashboard/organisation/edit-organisation/${orgId}?tab=staff`);
  };

  if (submitLoading) {
    return (
      <DashboardLayout
        pageClass="add-staff-module"
        pageTag="Staff Management"
        pageTitle="Add New Staff"
        pageDesc="Create a new staff member"
      >
        <div className="add-staff-content">
          <div className="header-actions">
            <div className="back-button" onClick={handleBack}>
              <ArrowLeftOutlined />
              <span>Back</span>
            </div>
          </div>

          <div className="skeleton-container">
            <h2>Staff Information</h2>
            <div className="form-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="input-container">
                  <Skeleton active paragraph={{ rows: 1 }} />
                </div>
              ))}
            </div>
            <h2>Additional Information</h2>
            <div className="form-grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="input-container">
                  <Skeleton active paragraph={{ rows: 1 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageClass="add-staff-module"
      pageTag="Staff Management"
      pageTitle="Add New Staff"
      pageDesc="Create a new staff member in the SourceID platform"
    >
      <div className="add-staff-module">
        <div className="header-actions">
          <div className="back-button" onClick={handleBack}>
            <ArrowLeftOutlined />
            <span>Back</span>
          </div>
        </div>

        <div className="add-staff-content">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="add-staff-form"
            initialValues={{
              organization: orgId,
            }}
          >
            <div className="form-section">
              <h3 className="section-title">Staff Information</h3>

              <div className="form-grid">
                <div className="input-container">
                  <Form.Item
                    name="firstName"
                    label="First Name *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="middleName"
                    label="Middle Name"
                  >
                    <Input placeholder="Enter middle name (optional)" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="lastName"
                    label="Last Name *"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="email"
                    label="Email Address *"
                    rules={[
                      { required: true, message: "Please enter email address" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number *"
                    rules={[
                      { required: true, message: "Please enter phone number" },
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
                    name="title"
                    label="Job Title *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter job title",
                      },
                    ]}
                  >
                    <Input placeholder="Enter job title" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth *"
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="gender"
                    label="Gender *"
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
                  >
                    <Select placeholder="Select gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="organization"
                    label="Organization *"
                    tooltip="This field is pre-populated and cannot be changed"
                  >
                    <Input 
                      placeholder="Organization" 
                      value={organization?.name || ""}
                      disabled
                    />
                    <Input type="hidden" value={orgId} />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Button onClick={handleCancel} className="cancel-button">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                className="submit-button"
              >
                Create Staff
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddStaff; 