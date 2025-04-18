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
  Spin,
  Row,
  Col,
  Tabs,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  updateOrganisationRequest,
  resetUpdateOrganisationState,
} from "@/store/organisation/actions";
import { UpdateOrganizationPayload } from "@/store/organisation/types";
import { AnyAction } from "redux";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import "./style.css";
import {
  selectOrgLoading,
  selectOrgs,
  selectUpdateOrganization,
} from "@/store/organisation/selectors";
import { ExtendedOrganization, FormValues, StaffMember } from "./model";
import ConfirmationModal from "@/components/modals/confrimation-modal";

const { Option } = Select;

const EditOrganisation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  // const [showMfaSettings, setShowMfaSettings] = useState<boolean>(false);

  // Check for tab query parameter
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");
  const [activeTab, setActiveTab] = useState<string>(
    tabParam === "staff" ? "2" : "1"
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Add state for confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<boolean>(false);

  // Get organization data and loading states from Redux
  const organizations = useSelector(selectOrgs);
  const fetchLoading = useSelector(selectOrgLoading);
  const {
    loading: updateLoading,
    success: updateSuccess,
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

  // Mock staff data - in a real application, this would be fetched from an API
  const [staffMembers] = useState<StaffMember[]>([
    {
      _id: "1",
      title: "Head Manager",
      firstName: "Camilla",
      lastName: "Rimdans",
      middleName: "",
      photo: "",
      phoneNumber: "+2349139369457",
      email: "camilla.rimdans@ubagroup.com",
      emailVerified: false,
      mfaTotpSecret: null,
      isMfaSetupComplete: false,
      verified: false,
      dateOfBirth: "2020-04-03T18:06:06.668Z",
      roles: ["67fe663cff52d662a0244ded"],
    },
    {
      _id: "2",
      title: "Director",
      firstName: "John",
      lastName: "Smith",
      middleName: "David",
      photo: "",
      phoneNumber: "+2348012345678",
      email: "john.smith@ubagroup.com",
      emailVerified: true,
      mfaTotpSecret: null,
      isMfaSetupComplete: true,
      verified: true,
      dateOfBirth: "1985-06-15T12:00:00.000Z",
      roles: ["67fe663cff52d662a0244dee"],
    },
  ]);

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

  const handleBack = (): void => {
    router.push("/dashboard/organisation");
  };

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
  };

  // Handle search for staff members
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    // In a real app, you would trigger an API call to search staff
  };

  // Add new staff member
  const handleAddStaff = (): void => {
    // Navigate to add staff page with the organization ID
    router.push(`/dashboard/staff/edit-staff/new/${id}`);
  };

  // View staff member details
  const handleViewStaff = (staffId: string): void => {
    // Navigate to staff details page
    router.push(`/dashboard/staff/edit-staff/${staffId}/${id}`);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (staffId: string): void => {
    setStaffToDelete(staffId);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false);
    setStaffToDelete(null);
  };

  // Handle staff deletion
  const handleDeleteStaff = (): void => {
    if (!staffToDelete) return;

    setDeletingStaff(true);

    // In a real implementation, you would call an API to delete the staff member
    console.log(`Deleting staff with ID: ${staffToDelete}`);

    // Simulate API call with timeout
    setTimeout(() => {
      // Remove staff from the local state
      // In a real implementation, you would dispatch an action to update the Redux store
      setDeletingStaff(false);
      setShowDeleteModal(false);
      setStaffToDelete(null);
      // For now, we're not actually removing the staff member from the UI
    }, 1000);
  };

  // Format date function for displaying created date
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Staff filter function
  const filterStaffMember = (staff: StaffMember): boolean => {
    return (
      staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter staff based on search term
  const filteredStaff = staffMembers.filter(filterStaffMember);

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

  const renderDetailsTab = (): React.ReactNode => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="edit-organisation-form"
      initialValues={{}}
    >
      <div className="section">
        <h2>Organization Information</h2>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Organization Name"
              name="name"
              rules={[
                { required: true, message: "Please enter organization name" },
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
              rules={[{ required: true, message: "Please enter phone number" }]}
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
                {countryOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Organization Logo" name="img">
              <Upload
                name="logo"
                listType="picture"
                className="logo-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>
                  {imageUrl ? "Change Logo" : "Upload Logo"}
                </Button>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Organization Logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "120px",
                      marginTop: "12px",
                    }}
                  />
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Distance Tolerance (meters)"
              name="distanceTolerance"
              tooltip="Maximum allowed distance deviation for geolocation activities"
              rules={[
                { required: true, message: "Please enter distance tolerance" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Enter distance tolerance"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="section">
        <h2>Address Information</h2>
        <Row gutter={16}>
          <Col span={8}>
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
          <Col span={8}>
            <Form.Item
              label="Address Line 2"
              name={["address", "addressLineTwo"]}
            >
              <Input placeholder="Enter address line 2 (optional)" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="City"
              name={["address", "city"]}
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="State/Region"
              name={["address", "region"]}
              rules={[{ required: true, message: "Please enter state/region" }]}
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
          <Col span={8}>
            <Form.Item
              label="Country Code"
              name={["address", "countryCode"]}
              rules={[{ required: true, message: "Please enter country code" }]}
            >
              <Input placeholder="Enter country code" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="form-actions">
        <Button onClick={handleBack}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={updateLoading}>
          Save Changes
        </Button>
      </div>
    </Form>
  );

  // Staff tab content
  const renderStaffTab = (): React.ReactNode => (
    <div className="user-table">
      <div className="section-actions">
        <div className="input-container">
          <Input
            size="large"
            placeholder="Search for Staff"
            prefix={<img src="/assets/icons/search.svg" alt="" />}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="click-actions">
          <button className="btn-icon filter">
            <img src="/assets/icons/filter.svg" alt="filter" />
            Filter
          </button>
          <button className="add-new-admin btn-icon" onClick={handleAddStaff}>
            <img src="/assets/icons/plus.svg" alt="add new staff" />
            Add New Staff
          </button>
        </div>
      </div>

      <div className="table">
        <div className="table-header">
          <div>
            <h3>Staff Members</h3>
            <p>Manage staff members associated with this organization</p>
          </div>
        </div>

        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No staff members found
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff._id}>
                    <td>
                      <div className="customer-name">
                        <span>{`${staff.firstName} ${
                          staff.middleName ? staff.middleName + " " : ""
                        }${staff.lastName}`}</span>
                      </div>
                    </td>
                    <td>{staff.email}</td>
                    <td>{staff.title}</td>
                    <td>
                      <div className="action-icons">
                        <img
                          src="/assets/icons/view.svg"
                          alt="View"
                          className="view-icon"
                          onClick={(): void => handleViewStaff(staff._id)}
                        />
                        <img
                          src="/assets/icons/trash-can.svg"
                          alt="Delete"
                          className="delete-icon"
                          onClick={(): void => handleDeleteClick(staff._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination-container">
            {/* Add pagination component here if needed */}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        closeModal={handleCloseDeleteModal}
        callback={handleDeleteStaff}
        loading={deletingStaff}
        title="Delete Staff Member"
        description="Are you sure you want to delete this staff member? This action cannot be undone."
        type="delete"
        callBackBtnText="Delete"
      />
    </div>
  );

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

        <Tabs
          className="tabs"
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              label: "Details",
              key: "1",
              children: renderDetailsTab(),
            },
            {
              label: "Staff",
              key: "2",
              children: renderStaffTab(),
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditOrganisation;
