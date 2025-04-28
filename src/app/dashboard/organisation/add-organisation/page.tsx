/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Divider,
  Upload,
  message,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  createOrganisationRequest,
  resetCreateOrganisationState,
} from "@/store/organisation/actions";
import "./style.css";
import { AnyAction } from "redux";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { selectCreateOrganization } from "@/store/organisation/selectors";

const { Option } = Select;

interface CountryOption {
  value: string;
  label: string;
  code: string;
}

// Define interface for form data
interface OrganisationFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  distanceTolerance: number;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  region: string;
  countryCode: string;
  zipCode: string;
  longitude?: number;
  latitude?: number;
  [key: string]: string | number | undefined;
}

// Sample country list - in a real app, you would fetch this from an API
const countryOptions: CountryOption[] = [
  { value: "US", label: "United States", code: "US" },
  { value: "UK", label: "United Kingdom", code: "GB" },
  { value: "CA", label: "Canada", code: "CA" },
  { value: "AU", label: "Australia", code: "AU" },
  { value: "NZ", label: "New Zealand", code: "NZ" },
  { value: "NG", label: "Nigeria", code: "NG" },
  { value: "GH", label: "Ghana", code: "GH" },
  { value: "ZA", label: "South Africa", code: "ZA" },
];

const AddOrganisation: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrganization = useSelector(selectCreateOrganization);
  const { loading, success } = createOrganization;

  useEffect(() => {
    // Reset the create organization state when component mounts
    dispatch(resetCreateOrganisationState() as unknown as AnyAction);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      message.success("Organization created successfully!");
      router.push("/dashboard/organisation");
    }
  }, [success, router]);

  const handleSubmit = (values: OrganisationFormValues): void => {
    // Convert address to the format required by API
    const formattedValues = {
      ...values,
      img: imageUrl || "https://via.placeholder.com/150", // Default image if none provided
      address: {
        addressLineOne: values.addressLineOne,
        addressLineTwo: values.addressLineTwo,
        city: values.city,
        region: values.region,
        countryCode: values.countryCode,
        zipCode: values.zipCode,
        longitude: values.longitude,
        latitude: values.latitude,
      },
      // Remove the flattened address fields from the top level
      addressLineOne: undefined,
      addressLineTwo: undefined,
      city: undefined,
      region: undefined,
      countryCode: undefined,
      zipCode: undefined,
      longitude: undefined,
      latitude: undefined,
    };

    dispatch(
      createOrganisationRequest(formattedValues) as unknown as AnyAction
    );
  };

  // Mock function to handle image upload
  // In a real app, you would upload to a server/cloud storage
  const handleImageUpload = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get a URL from the response
      // For now, we'll just use a mock URL
      setImageUrl("https://via.placeholder.com/150");
      setUploadLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCancel = (): void => {
    router.push("/dashboard/organisation");
  };

  const handleBack = (): void => {
    router.push("/dashboard/organisation");
  };

  return (
    <DashboardLayout
      pageClass="add-organisation-module"
      pageTag="Organisation"
      pageTitle="Add New Organisation"
      pageDesc="Create a new client organisation in the SourceID platform"
    >
      <div className="add-organisation-module">
        <div className="header-actions">
          <div className="back-button" onClick={handleBack}>
            {/* Use your actual back arrow icon */}
            <span>←</span>
            Back
          </div>
        </div>

        <div className="add-organisation-content">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="add-organisation-form"
            initialValues={{
              distanceTolerance: 100, // Default value
            }}
          >
            <div className="form-section">
              <h3 className="section-title">Organisation Information</h3>

              <div className="form-grid">
                <div className="input-container">
                  <Form.Item
                    name="name"
                    label="Organisation Name *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter organisation name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter organisation name" />
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
                    ]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="country"
                    label="Country *"
                    rules={[
                      { required: true, message: "Please select country" },
                    ]}
                  >
                    <Select
                      placeholder="Select country"
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
                    name="distanceTolerance"
                    label="Distance Tolerance (meters) *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter distance tolerance",
                      },
                    ]}
                    tooltip="Maximum distance in meters allowed for location verification"
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      placeholder="Enter distance tolerance"
                    />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item name="img" label="Organisation Logo">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Mock URL
                      onChange={handleImageUpload}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>

            <Divider />

            <div className="form-section">
              <h3 className="section-title">Address Information</h3>

              <div className="form-grid">
                <div className="input-container">
                  <Form.Item
                    name="addressLineOne"
                    label="Address Line 1 *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter address line 1",
                      },
                    ]}
                  >
                    <Input placeholder="Enter address line 1" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item name="addressLineTwo" label="Address Line 2">
                    <Input placeholder="Enter address line 2 (optional)" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="city"
                    label="City *"
                    rules={[{ required: true, message: "Please enter city" }]}
                  >
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="region"
                    label="State/Province/Region *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter state/province/region",
                      },
                    ]}
                  >
                    <Input placeholder="Enter state/province/region" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="zipCode"
                    label="Postal/Zip Code *"
                    rules={[
                      {
                        required: true,
                        message: "Please enter postal/zip code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter postal/zip code" />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="countryCode"
                    label="Country Code *"
                    rules={[
                      { required: true, message: "Please select country code" },
                    ]}
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
                    name="latitude"
                    label="Latitude"
                    tooltip="Optional GPS coordinate"
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Enter latitude"
                    />
                  </Form.Item>
                </div>

                <div className="input-container">
                  <Form.Item
                    name="longitude"
                    label="Longitude"
                    tooltip="Optional GPS coordinate"
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Enter longitude"
                    />
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
                loading={loading}
                className="submit-button"
              >
                Create Organisation
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddOrganisation;
