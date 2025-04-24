/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
  Skeleton,
  message,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  updateOrganisationRequest,
  resetUpdateOrganisationState,
  fetchOrganisationStaffRequest,
  deleteStaffRequest,
} from "@/store/organisation/actions";
import { UpdateOrganizationPayload } from "@/store/organisation/types";
import { AnyAction } from "redux";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import "./style.css";
import {
  selectOrgLoading,
  selectOrgs,
  selectUpdateOrganization,
  selectStaffLoading,
  selectStaffData,
  selectStaffDeleteLoading,
  selectStaffDeleteSuccess,
} from "@/store/organisation/selectors";
import { ExtendedOrganization, FormValues, StaffMember } from "./model";
import ConfirmationModal from "@/components/modals/confrimation-modal";

const { Option } = Select;

const EditOrganisation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const idString = id as string; // Type assertion to handle id as string
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");
  
  // Set initial tab based on query parameter (staff = "2", details = "1")
  const initialTab = tabParam === "staff" ? "2" : "1";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  // Staff-related state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [form] = Form.useForm();

  // Get organization data and loading states from Redux
  const organizations = useSelector(selectOrgs);
  const fetchLoading = useSelector(selectOrgLoading);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector(selectUpdateOrganization);

  // Get staff data from Redux
  const staffLoading = useSelector(selectStaffLoading);
  const staffMembers = useSelector(selectStaffData);
  const deletingStaff = useSelector(selectStaffDeleteLoading);
  const deleteSuccess = useSelector(selectStaffDeleteSuccess);

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
      setLogo(organizationToEdit.img ? new File([], "") : null);
    }
  }, [organizationToEdit, form]);

  // Initial data fetch
  useEffect(() => {
    if (idString) {
      // Fetch organizations if not already loaded
      if (organizations.length === 0) {
        dispatch(fetchOrganisationsRequest() as unknown as AnyAction);
      }

      // Fetch staff members for this organization
      if (activeTab === "2") {
        dispatch(
          fetchOrganisationStaffRequest({
            organizationId: idString,
            page: currentPage,
            limit: pageSize,
            search: searchTerm,
          }) as unknown as AnyAction
        );
      }
    }
  }, [idString, dispatch, organizations.length, currentPage, pageSize, searchTerm, activeTab]);

  // Reset update state on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetUpdateOrganisationState() as AnyAction);
    };
  }, [dispatch]);

  // Navigate back to organizations page on successful update
  useEffect(() => {
    if (updateSuccess) {
      message.success("Organization updated successfully");
      dispatch(resetUpdateOrganisationState() as AnyAction);
    }
  }, [updateSuccess, dispatch]);

  // Show error message if update fails
  useEffect(() => {
    if (updateError) {
      message.error(`Failed to update organization: ${updateError}`);
    }
  }, [updateError]);

  // Refresh staff list when a staff member is successfully deleted
  useEffect(() => {
    if (deleteSuccess && id) {
      dispatch(
        fetchOrganisationStaffRequest({
          organizationId: id,
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
        }) as unknown as AnyAction
      );
      setShowDeleteModal(false);
      setStaffToDelete(null);
    }
  }, [deleteSuccess, dispatch, id, currentPage, pageSize, searchTerm]);

  // Submit form handler
  const handleSubmit = (values: FormValues): void => {
    if (!idString) return;

    // Prepare address object
    const address = {
      addressLineOne: values.addressLineOne,
      addressLineTwo: values.addressLineTwo,
      city: values.city,
      region: values.region,
      countryCode: values.countryCode,
      zipCode: values.zipCode,
      longitude: values.longitude,
      latitude: values.latitude,
    };

    // Prepare update data
    const updateData = {
      organizationId: idString,
      name: values.name,
      img: organizationToEdit?.img || "", // Keep existing image if no new one
      phoneNumber: values.phoneNumber,
      email: values.email,
      country: values.country,
      distanceTolerance: values.distanceTolerance,
      address,
    };

    dispatch(updateOrganisationRequest(updateData) as unknown as AnyAction);
  };

  // Handle image upload
  const handleImageUpload = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      if (info.file.originFileObj) {
        setLogo(info.file.originFileObj);
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleBack = (): void => {
    router.push("/dashboard/organisation");
  };

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
    // Fetch staff data when switching to staff tab
    if (key === "2" && id) {
      dispatch(
        fetchOrganisationStaffRequest({
          organizationId: id,
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
        }) as unknown as AnyAction
      );
    }
    
    // Update URL to reflect the current tab without causing a page reload
    const tabParam = key === "2" ? "staff" : "details";
    const url = `/dashboard/organisation/edit-organisation/${id}?tab=${tabParam}`;
    
    // Use window.history to update URL without causing a navigation
    window.history.replaceState({}, "", url);
  };

  // Handle search for staff members
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Add new staff member
  const handleAddStaff = (): void => {
    // Navigate to add staff page with the organization ID
    router.push(`/dashboard/staff/add-staff?orgId=${idString}`);
  };

  // View staff member details
  const handleViewStaff = (staffId: string): void => {
    // Navigate to view staff details page
    router.push(`/dashboard/staff/view-staff/${staffId}?orgId=${idString}`);
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
    if (!staffToDelete || !idString) return;
    
    dispatch(
      deleteStaffRequest(staffToDelete, idString) as unknown as AnyAction
    );
  };

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize?: number): void => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  // Format date function for displaying created date
  const _formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Filter staff members based on search term
  const filteredStaff = searchTerm
    ? staffMembers.filter((staff) => 
        staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : staffMembers;

  if (fetchLoading || !organizationToEdit) {
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
            items={[
              {
                label: "Details",
                key: "1",
                children: (
                  <div className="section skeleton-container">
                    <h2>Organization Information</h2>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                      <Col span={12}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                      <Col span={12}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                    </Row>
                    <h2>Address Information</h2>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                      <Col span={8}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                      <Col span={8}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                      </Col>
                    </Row>
                  </div>
                ),
              },
              {
                label: "Staff",
                key: "2",
                children: <div></div>,
              },
            ]}
          />
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
            <Form.Item label="Logo" name="logo">
              <Upload
                name="logo"
                listType="picture"
                maxCount={1}
                onChange={handleImageUpload}
                // Placeholder beforeUpload to prevent automatic upload
                beforeUpload={(file) => {
                  return false;
                }}
              >
                <Button>Click to upload</Button>
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
          {staffLoading ? (
            <div className="skeleton-loading">
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
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td><Skeleton paragraph={false} title={{ width: '100%' }} active /></td>
                      <td><Skeleton paragraph={false} title={{ width: '100%' }} active /></td>
                      <td><Skeleton paragraph={false} title={{ width: '100%' }} active /></td>
                      <td><Skeleton paragraph={false} title={{ width: '100%' }} active /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
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
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-footer">
          <div className="pagination-container">
            {/* Add pagination component */}
            {filteredStaff.length > 0 && (
              <Row justify="space-between" align="middle">
                <Col>
                  <span className="pagination-info">
                    Showing {(currentPage - 1) * pageSize + 1} to{" "}
                    {Math.min(currentPage * pageSize, filteredStaff.length)} of{" "}
                    {filteredStaff.length} entries
                  </span>
                </Col>
                <Col>
                  <Row justify="end">
                    <Col className="pagination-button-col">
                      <Button
                        disabled={currentPage === 1}
                        onClick={() => handlePaginationChange(currentPage - 1)}
                        className="pagination-button"
                      >
                        Previous
                      </Button>
                    </Col>
                    <Col className="pagination-page-col">
                      <span className="pagination-page-info">
                        Page {currentPage}
                      </span>
                    </Col>
                    <Col className="pagination-button-col">
                      <Button
                        disabled={currentPage * pageSize >= filteredStaff.length}
                        onClick={() => handlePaginationChange(currentPage + 1)}
                        className="pagination-button"
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
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
