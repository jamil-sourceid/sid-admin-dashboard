/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  Divider,
  Descriptions,
  Card,
  Avatar,
  Skeleton,
  Tag,
  message,
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import DashboardLayout from "@/layouts/dashboard-layout";
import { AnyAction } from "redux";
import "./style.css";
import { selectOrgs } from "@/store/organisation/selectors";
import { 
  selectCurrentStaff, 
  selectCurrentStaffLoading, 
  selectCurrentStaffError 
} from "@/store/staff/selectors";
import { selectStaffData } from "@/store/organisation/selectors";
import { fetchStaffByIdRequest } from "@/store/staff/actions";
import dayjs from "dayjs";

// Sample roles and groups - These would normally come from another API endpoint
const sampleRoles = [
  { _id: "role1", name: "Admin" },
  { _id: "role2", name: "Manager" },
  { _id: "role3", name: "User" },
  { _id: "role4", name: "Supervisor" },
  // Add common roles that might appear in your system
  { _id: "5f8d4c1e8e7f1a0b9c0d8e7f", name: "Administrator" },
  { _id: "5f8d4c1e8e7f1a0b9c0d8e7e", name: "Editor" },
  { _id: "5f8d4c1e8e7f1a0b9c0d8e7d", name: "Viewer" },
  { _id: "5f8d4c1e8e7f1a0b9c0d8e7c", name: "Operator" },
  { _id: "5f8d4c1e8e7f1a0b9c0d8e7b", name: "System Admin" }
];

// Common role names mapping (to handle cases where IDs don't match)
const commonRoleNames: {[key: string]: string} = {
  "admin": "Administrator",
  "administrator": "Administrator",
  "manager": "Manager",
  "user": "User",
  "superadmin": "Super Admin",
  "super_admin": "Super Admin",
  "supervisor": "Supervisor",
  "editor": "Editor",
  "viewer": "Viewer",
  "operator": "Operator",
  "staff": "Staff Member"
};

// Common interface for staff member data across different sources
interface NormalizedStaffMember {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  title: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  photo?: string;
  status: string;
  country?: string;
  countryCode?: string;
  organizationId?: string;
  organization?: string;
  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: string;
  emailVerified?: boolean;
  isMfaSetupComplete?: boolean;
  roles?: string[];
  verified?: boolean;
}

// Type for an object from an unknown source that might have role data
interface UnknownRole {
  _id?: string;
  name?: string;
  [key: string]: unknown;
}

const ViewStaff: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = params?.id || "";
  const orgId = searchParams?.get("orgId") || "";

  // Get staff data from Redux store
  const staffData = useSelector(selectCurrentStaff);
  const loading = useSelector(selectCurrentStaffLoading);
  const error = useSelector(selectCurrentStaffError);
  
  // Get organization staff data (for backup if redux staff data isn't available)
  const orgStaffMembers = useSelector(selectStaffData);
  const [staffMember, setStaffMember] = useState<NormalizedStaffMember | null>(null);
  const [dataSource, setDataSource] = useState<'org' | 'api' | null>(null);
  
  // Get organizations from Redux store
  const organizations = useSelector(selectOrgs);
  const organization = organizations.find((org) => 
    org._id === (staffMember?.organizationId || staffMember?.organization || orgId)
  );

  // Try to find staff member in organization staff list first
  useEffect(() => {
    if (id && orgStaffMembers && orgStaffMembers.length > 0) {
      const foundStaff = orgStaffMembers.find(staff => staff._id === id);
      if (foundStaff) {
        // Convert from organization staff format to standard staff format
        setStaffMember({
          id: foundStaff._id,
          firstName: foundStaff.firstName || "",
          lastName: foundStaff.lastName || "",
          email: foundStaff.email || "",
          title: foundStaff.title || "",
          phoneNumber: foundStaff.phoneNumber || "",
          profilePictureUrl: foundStaff.photo,
          status: foundStaff.verified ? "active" : "inactive",
          countryCode: foundStaff.countryCode || "",
          country: "",
          organizationId: foundStaff.organization || orgId,
          // Other fields from organization staff
          middleName: foundStaff.middleName || "",
          // Ensure roles is always an array
          roles: Array.isArray(foundStaff.roles) ? 
            foundStaff.roles.map((role: UnknownRole | string) => {
              if (typeof role === 'string') return role;
              return role && typeof role === 'object' ? (role._id || role.name || "") : "";
            }).filter(Boolean) : // Filter out empty strings
            [],
          emailVerified: Boolean(foundStaff.emailVerified),
          isMfaSetupComplete: Boolean(foundStaff.isMfaSetupComplete),
          dateOfBirth: foundStaff.dateOfBirth || "",
          verified: Boolean(foundStaff.verified),
        });
        setDataSource('org');
      }
    }
  }, [id, orgStaffMembers, orgId]);

  // Only fetch from API if not found in the organization staff list and we haven't tried before
  useEffect(() => {
    // Skip the API call entirely if we already found the staff in organization data
    if (dataSource === 'org') return;
    
    // Only make the API call if we don't have staff data and haven't tried API before
    if (id && !staffMember && dataSource !== 'api') {
      // Set dataSource to 'api' right away to prevent additional calls
      setDataSource('api');
      dispatch(fetchStaffByIdRequest(id) as unknown as AnyAction);
    }
  }, [id, dispatch, staffMember, dataSource]);

  // Update staffMember when staffData changes
  useEffect(() => {
    if (staffData && dataSource === 'api') {
      setStaffMember({
        id: staffData.id,
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        email: staffData.email,
        title: staffData.title,
        phoneNumber: staffData.phoneNumber,
        profilePictureUrl: staffData.profilePictureUrl,
        status: staffData.status,
        country: staffData.country,
        countryCode: staffData.countryCode,
        organizationId: staffData.organizationId,
        createdAt: staffData.createdAt,
        updatedAt: staffData.updatedAt,
      });
    }
  }, [staffData, dataSource]);

  // Show error message if staff fetch fails, but only if we don't already have data
  useEffect(() => {
    if (error && dataSource === 'api' && !staffMember) {
      message.error(`Failed to fetch staff details: ${error}`);
    }
  }, [error, dataSource, staffMember]);

  const handleBack = (): void => {
    // Navigate back to organization staff list
    if (orgId) {
      router.push(`/dashboard/organisation/edit-organisation/${orgId}?tab=staff`);
    } else {
      router.push("/dashboard/organisation");
    }
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    return dayjs(dateString).format("MMMM D, YYYY");
  };

  // Get role names from ids with improved role name resolution
  const getRoleNames = (roleIds?: string[]): string[] => {
    if (!roleIds || !roleIds.length) return [];
    
    return roleIds.map(roleId => {
      if (!roleId) return "Staff Role";
      
      // Case 1: Check if it matches any common role names (case insensitive)
      const lowerRoleId = roleId.toLowerCase();
      if (commonRoleNames[lowerRoleId]) {
        return commonRoleNames[lowerRoleId];
      }
      
      // Case 2: Try to find a matching role by ID
      const role = sampleRoles.find(r => r._id === roleId);
      if (role) return role.name;
      
      // Case 3: If it looks like a readable name, return it capitalized
      if (/^[a-zA-Z]+$/.test(roleId)) {
        return roleId.charAt(0).toUpperCase() + roleId.slice(1);
      }
      
      // Final fallback
      return "Staff Role";
    });
  };

  if ((loading && dataSource !== 'org') || !staffMember) {
    return (
      <DashboardLayout
        pageClass="view-staff-module"
        pageTag="Staff Management"
        pageTitle="View Staff Details"
        pageDesc="View staff member details"
      >
        <div className="view-staff-content">
          <div className="header-actions">
            <div className="back-button" onClick={handleBack}>
              <ArrowLeftOutlined />
              <span>Back</span>
            </div>
          </div>
          
          <div className="skeleton-container">
            <Skeleton avatar={{ size: 64 }} active paragraph={{ rows: 4 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 6 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Prepare personal information items - only include fields with values
  const personalInfoItems = [
    { label: "First Name", value: staffMember.firstName },
    { label: "Last Name", value: staffMember.lastName },
    staffMember.middleName ? { label: "Middle Name", value: staffMember.middleName } : null,
    { label: "Email Address", value: staffMember.email },
    { label: "Phone Number", value: staffMember.phoneNumber },
    { label: "Job Title", value: staffMember.title },
    organization?.name ? { label: "Organization", value: organization.name } : null,
    staffMember.country ? { label: "Country", value: staffMember.country } : null,
    staffMember.countryCode ? { label: "Country Code", value: staffMember.countryCode } : null,
    staffMember.dateOfBirth ? { label: "Date of Birth", value: formatDate(staffMember.dateOfBirth) } : null,
    staffMember.createdAt ? { label: "Created At", value: formatDate(staffMember.createdAt) } : null,
    staffMember.updatedAt ? { label: "Updated At", value: formatDate(staffMember.updatedAt) } : null,
  ].filter((item): item is {label: string, value: string} => item !== null && Boolean(item.value)); // Remove null items and filter out empty values

  return (
    <DashboardLayout
      pageClass="view-staff-module"
      pageTag="Staff Management"
      pageTitle="View Staff Details"
      pageDesc="View staff member details in the SourceID platform"
    >
      <div className="view-staff-module">
        <div className="header-actions">
          <div className="back-button" onClick={handleBack}>
            <ArrowLeftOutlined />
            <span>Back</span>
          </div>
        </div>

        <div className="view-staff-content">
          <Card className="staff-profile-card">
            <div className="staff-profile-header">
              <Avatar 
                size={64} 
                icon={<UserOutlined />} 
                src={staffMember.profilePictureUrl || staffMember.photo}
                className="staff-avatar"
              />
              <div className="staff-header-info">
                <h2>{`${staffMember.firstName} ${staffMember.middleName ? staffMember.middleName + ' ' : ''}${staffMember.lastName}`}</h2>
                <p>{staffMember.title}</p>
                <p>{staffMember.email}</p>
              </div>
            </div>
          </Card>

          <Card title="Personal Information" className="staff-info-card">
            <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
              {/* Only render information that is available */}
              {personalInfoItems.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  {item.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>

          {staffMember.roles && staffMember.roles.length > 0 && (
            <Card title="Roles & Access" className="staff-info-card">
              <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                <Descriptions.Item label="Roles" span={2}>
                  <div className="tag-container">
                    {getRoleNames(staffMember.roles).map((role, index) => (
                      <Tag key={index} color="blue">
                        {role}
                      </Tag>
                    ))}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}

          <Card title="Account Status" className="staff-info-card">
            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
              {staffMember.emailVerified !== undefined && (
                <Descriptions.Item label="Email Verified">
                  <Tag color={staffMember.emailVerified ? "success" : "error"}>
                    {staffMember.emailVerified ? "Verified" : "Not Verified"}
                  </Tag>
                </Descriptions.Item>
              )}
              {staffMember.isMfaSetupComplete !== undefined && (
                <Descriptions.Item label="MFA Setup">
                  <Tag color={staffMember.isMfaSetupComplete ? "success" : "error"}>
                    {staffMember.isMfaSetupComplete ? "Completed" : "Not Completed"}
                  </Tag>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Status">
                <Tag color={(staffMember.status === 'active' || staffMember.verified) ? "success" : "error"}>
                  {(staffMember.status === 'active' || staffMember.verified) ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewStaff; 