/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Upload,
  Switch,
  Spin,
  Row,
  Col,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  updateOrganisationRequest,
  resetUpdateOrganisationState,
} from "@/store/organisation/actions";
import {
  Organization,
  UpdateOrganizationPayload,
} from "@/store/organisation/types";
import { AnyAction } from "redux";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import "./style.css";
import {
  selectOrgLoading,
  selectOrgs,
  selectUpdateOrganization,
} from "@/store/organisation/selectors";

const { Option } = Select;

// Helper to handle possible missing properties in the Organization type
interface ExtendedOrganization extends Omit<Organization, "keyContact"> {
  email?: string;
  phoneNumber?: string;
  keyContact?: {
    _id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  distanceTolerance: number;
  address: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    region: string;
    zipCode: string;
    countryCode: string;
  };
}

const EditOrganisation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showMfaSettings, setShowMfaSettings] = useState<boolean>(false);

  // Get organization data and loading states from Redux
  const organizations = useSelector(selectOrgs);
  const fetchLoading = useSelector(selectOrgLoading);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector(selectUpdateOrganization);

  // Find the organization to edit and cast to extended type
  const organizationToEdit = organizations.find((org) => org._id === id) as
    | ExtendedOrganization
    | undefined;

  // Country options
  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "NZ", label: "New Zealand" },
    { value: "NG", label: "Nigeria" },
    { value: "GH", label: "Ghana" },
    { value: "ZA", label: "South Africa" },
  ];

  // Initialize form values when organization data is loaded
  useEffect(() => {
    if (organizationToEdit) {
      // Extract email and phone from keyContact if available, or use defaults
      const email =
        organizationToEdit.email || organizationToEdit.keyContact?.email || "";
      const phoneNumber =
        organizationToEdit.phoneNumber ||
        organizationToEdit.keyContact?.phoneNumber ||
        "";

      form.setFieldsValue({
        name: organizationToEdit.name,
        email,
        phoneNumber,
        country: organizationToEdit.country || "",
        distanceTolerance: organizationToEdit.distanceTolerance || 0,
        address: {
          addressLineOne: organizationToEdit.address?.addressLineOne || "",
          addressLineTwo: organizationToEdit.address?.addressLineTwo || "",
          city: organizationToEdit.address?.city || "",
          region: organizationToEdit.address?.region || "",
          zipCode: organizationToEdit.address?.zipCode || "",
          countryCode: organizationToEdit.address?.countryCode || "",
        },
      });
      setImageUrl(organizationToEdit.img || "");
      setShowMfaSettings(true);
    }
  }, [organizationToEdit, form]);

  // Reset update state on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetUpdateOrganisationState() as AnyAction);
    };
  }, [dispatch]);

  // Navigate back to organizations page on successful update
  useEffect(() => {
    if (updateSuccess) {
      router.push("/dashboard/organisation");
    }
  }, [updateSuccess, router]);

  // Handle form submission
  const handleSubmit = (values: FormValues): void => {
    if (!id) return;

    const formattedValues: UpdateOrganizationPayload = {
      organizationId: id,
      name: values.name,
      img: imageUrl || "https://example.com/default-image.jpg", // Default image if none provided
      phoneNumber: values.phoneNumber,
      email: values.email,
      address: {
        addressLineOne: values.address.addressLineOne,
        addressLineTwo: values.address.addressLineTwo,
        city: values.address.city,
        region: values.address.region,
        zipCode: values.address.zipCode,
        countryCode: values.address.countryCode,
      },
      country: values.country,
      distanceTolerance: values.distanceTolerance,
    };

    dispatch(updateOrganisationRequest(formattedValues) as AnyAction);
  };

  // Handle image upload
  const handleImageUpload = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === "done") {
      // In a real scenario, you would get the URL from the server response
      // For now, we'll simulate it with a placeholder URL
      setImageUrl("https://example.com/uploaded-image.jpg");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMfaToggle = (_checked: boolean): void => {
    // Silently accept the toggle without making an API call
    // We're keeping the UI but not sending to the API since it's not supported yet
    // Keep this commented out for now
    // if (!id) return;
    // const payload: ToggleOrganizationMfaPayload = {
    //   organizationId: id,
    //   mfaIsEnabled: _checked,
    // };
    // dispatch(toggleOrganisationMfaRequest(payload) as AnyAction);
  };

  const handleBack = (): void => {
    router.push("/dashboard/organisation");
  };

  if (fetchLoading || !organizationToEdit) {
    return (
      <DashboardLayout
        pageClass="edit-organisation-module"
        pageTag="Management"
        pageTitle="Edit Organisation"
        pageDesc="Update organisation details and settings"
      >
        <div className="edit-organisation-content">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageClass="edit-organisation-module"
      pageTag="Management"
      pageTitle="Edit Organisation"
      pageDesc="Update organisation details and settings"
    >
      <div className="edit-organisation-content">
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
          className="edit-organisation-form"
          initialValues={
            {
              // Initial values set in useEffect
            }
          }
        >
          <div className="section">
            <h2>Organization Information</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Organization Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter organization name",
                    },
                  ]}
                >
                  <Input placeholder="Enter organization name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Please select country" }]}
                >
                  <Select placeholder="Select country">
                    {countryOptions.map((country) => (
                      <Option key={country.value} value={country.value}>
                        {country.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Distance Tolerance (in miles)"
                  name="distanceTolerance"
                  rules={[
                    {
                      required: true,
                      message: "Please enter distance tolerance",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Organization Image">
                  <Upload
                    name="logo"
                    listType="picture"
                    customRequest={({ onSuccess }): void => {
                      // Mock a successful upload
                      setTimeout(() => {
                        if (onSuccess) {
                          onSuccess("ok", new XMLHttpRequest());
                        }
                      }, 0);
                    }}
                    onChange={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} loading={updateLoading}>
                      Upload Image
                    </Button>
                  </Upload>
                  {imageUrl && (
                    <div style={{ marginTop: "8px" }}>
                      <img
                        src={imageUrl}
                        alt="Organization Logo"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="section">
            <h2>Address Information</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Address Line 1"
                  name={["address", "addressLineOne"]}
                  rules={[
                    { required: true, message: "Please enter address line 1" },
                  ]}
                >
                  <Input placeholder="Enter address line 1" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Address Line 2"
                  name={["address", "addressLineTwo"]}
                >
                  <Input placeholder="Enter address line 2 (optional)" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="City"
                  name={["address", "city"]}
                  rules={[{ required: true, message: "Please enter city" }]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="State/Region"
                  name={["address", "region"]}
                  rules={[
                    { required: true, message: "Please enter state/region" },
                  ]}
                >
                  <Input placeholder="Enter state/region" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Zip/Postal Code"
                  name={["address", "zipCode"]}
                  rules={[
                    { required: true, message: "Please enter zip/postal code" },
                  ]}
                >
                  <Input placeholder="Enter zip/postal code" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Country Code"
              name={["address", "countryCode"]}
              rules={[{ required: true, message: "Please enter country code" }]}
            >
              <Select placeholder="Select country code">
                {countryOptions.map((country) => (
                  <Option key={country.value} value={country.value}>
                    {country.label} ({country.value})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {showMfaSettings && (
            <div className="section">
              <h2>MFA Settings</h2>
              <Form.Item label="Enable MFA" name="mfaIsEnabled">
                <Switch
                  defaultChecked={organizationToEdit?.mfaIsEnabled}
                  onChange={handleMfaToggle}
                />
              </Form.Item>
              <p className="mfa-description">
                Multi-Factor Authentication provides an additional layer of
                security for organization users.
              </p>
            </div>
          )}

          <div className="form-actions">
            <Button
              type="default"
              onClick={(): void => {
                router.push("/dashboard/organisation");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              Update Organization
            </Button>
          </div>

          {updateError && <div className="error-message">{updateError}</div>}
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default EditOrganisation;
