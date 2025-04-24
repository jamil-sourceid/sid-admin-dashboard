import {
  getData,
  postData,
  putData,
  deleteData,
  uploadToPresignedUrl
} from "@/setup/config/api";
import { RootState } from "@/store/rootReducer";

// Response types
export interface StaffListResponse {
  data: StaffMember[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  status: string;
  country?: string;
  countryCode?: string;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Request payload types
export interface CreateStaffPayload {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  profilePicture?: File | null;
  organizationId?: string;
  organization?: string; // For compatibility with forms that use organization instead of organizationId
  roles: string[];
  dateOfBirth?: string;
  gender?: string;
  middleName?: string;
}

export interface UpdateStaffPayload {
  staffId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  phoneNumber?: string;
  countryCode?: string;
  country?: string;
  profilePicture?: File | null;
  organizationId?: string;
  organization?: string; // For compatibility with forms that use organization instead of organizationId
  roles?: string[];
  status?: string;
  dateOfBirth?: string;
  gender?: string;
  middleName?: string;
}

// Parameters for getStaffList
export interface StaffParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

const staffService = {
  /**
   * Get list of staff with optional filtering
   */
  async getStaffList(params?: StaffParams): Promise<StaffListResponse> {
    try {
      if (!params) {
        params = { page: 1, limit: 10 };
      }
      
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      
      const url = `/staff/admin${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await getData<StaffListResponse>(url);
      
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response format from staff list API');
      }
      
      return response.data;
    } catch (error: any) {
      // Handle specific error types
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || 'Unknown server error';
        
        if (statusCode === 401) {
          console.error('Authentication error fetching staff list:', errorMessage);
          throw new Error('You are not authorized to access this data. Please log in again.');
        } else if (statusCode === 403) {
          console.error('Permission error fetching staff list:', errorMessage);
          throw new Error('You do not have permission to access this data.');
        } else if (statusCode === 404) {
          console.error('Staff list not found:', errorMessage);
          throw new Error('Staff list could not be found. The resource may have been moved or deleted.');
        } else {
          console.error(`Error (${statusCode}) fetching staff list:`, errorMessage);
          throw new Error(`Failed to fetch staff list: ${errorMessage}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received when fetching staff list:', error.request);
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        // Something else caused an error
        console.error('Error fetching staff list:', error.message || error);
        throw error;
      }
    }
  },

  /**
   * Get a staff member by ID
   */
  async getStaffById(staffId: string): Promise<StaffMember> {
    try {
      if (!staffId) {
        throw new Error('Staff ID is required');
      }
      
      const response = await getData<{ data: StaffMember }>(`/staff/admin/${staffId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching staff with ID ${staffId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new staff member
   */
  async createStaff(staffData: CreateStaffPayload): Promise<StaffMember> {
    try {
      if (!staffData) {
        throw new Error('Staff data is required');
      }
      
      // Handle file upload if profile picture is included
      let profilePictureUrl = undefined;
      
      if (staffData.profilePicture) {
        // First upload the file to get a URL
        const uploadResponse = await this.uploadStaffProfilePicture(staffData.profilePicture);
        profilePictureUrl = uploadResponse.url;
      }
      
      // Handle organization field conversion
      let organizationId = staffData.organizationId;
      if (!organizationId && staffData.organization) {
        organizationId = staffData.organization;
      }
      
      // Create staff with form data
      const staffPayload = {
        ...staffData,
        profilePictureUrl,
        // Convert organization to organizationId if needed
        organizationId,
        // Remove fields not needed in the API
        organization: undefined,
        profilePicture: undefined
      };
      
      const response = await postData<{ data: StaffMember }>('/staff/admin', staffPayload);
      return response.data.data;
    } catch (error) {
      console.error('Error creating staff:', error);
      throw error;
    }
  },

  /**
   * Update an existing staff member
   */
  async updateStaff(staffData: UpdateStaffPayload): Promise<StaffMember> {
    try {
      const { staffId, ...updateData } = staffData;
      
      if (!staffId) {
        throw new Error('Staff ID is required');
      }
      
      if (!updateData) {
        throw new Error('Staff data is required');
      }
      
      // Handle file upload if profile picture is included
      let profilePictureUrl = undefined;
      
      if (updateData.profilePicture) {
        // First upload the file to get a URL
        const uploadResponse = await this.uploadStaffProfilePicture(updateData.profilePicture);
        profilePictureUrl = uploadResponse.url;
      }
      
      // Handle organization field conversion
      let organizationId = updateData.organizationId;
      if (!organizationId && updateData.organization) {
        organizationId = updateData.organization;
      }
      
      // Update staff with form data
      const staffPayload = {
        ...updateData,
        profilePictureUrl: profilePictureUrl || undefined,
        // Convert organization to organizationId if needed
        organizationId,
        // Remove fields not needed in the API
        organization: undefined,
        profilePicture: undefined
      };
      
      const response = await putData<{ data: StaffMember }>(`/staff/admin/${staffId}`, staffPayload);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating staff with ID ${staffData.staffId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a staff member
   */
  async deleteStaff(staffId: string): Promise<void> {
    try {
      if (!staffId) {
        throw new Error('Staff ID is required');
      }
      
      await deleteData(`/staff/admin/${staffId}`);
    } catch (error) {
      console.error(`Error deleting staff with ID ${staffId}:`, error);
      throw error;
    }
  },

  /**
   * Upload a staff profile picture and get the URL
   */
  async uploadStaffProfilePicture(file: File): Promise<{ url: string }> {
    try {
      if (!file) {
        throw new Error('File is required');
      }
      
      // Get presigned URL from API
      const getUrlResponse = await postData<{ data: { url: string; fields: Record<string, string>; key?: string } }>(
        '/upload/presigned-url',
        {
          fileType: file.type,
          fileName: file.name,
          directory: 'staff-profile-pictures'
        }
      );
      
      // Check response structure
      const { data } = getUrlResponse.data;
      
      if (!data.url) {
        throw new Error('Invalid response format: Missing URL');
      }
      
      // Upload to the presigned URL
      await uploadToPresignedUrl(data.url, file);
      
      // Return the final URL for the uploaded file
      // If the API returns a key, use it to construct the final URL
      let fileUrl = data.url;
      if (data.key) {
        // Some services return a base URL and a key separately
        // In that case, we need to construct the final URL
        const baseUrl = data.url.split('?')[0]; // Remove query params if any
        fileUrl = `${baseUrl}/${data.key}`;
      }
      
      return { url: fileUrl };
    } catch (error) {
      console.error('Error uploading staff profile picture:', error);
      throw error;
    }
  }
};

export default staffService; 