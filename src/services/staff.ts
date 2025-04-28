import { getData, postData, putData, deleteData } from "../setup/config/api";
import { 
  UpdateStaffPayload as StaffUpdatePayload, 
  CreateStaffPayload as StaffCreatePayload 
} from '../store/staff/types';

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

/**
 * Get a list of staff members
 * @param params Optional parameters for pagination and filtering
 * @returns A promise with the staff list response
 */
export const getStaffList = async (params?: StaffParams) => {
  try {
    const response = await getData('/staff', params as Record<string, unknown>);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff list:', error);
    throw error;
  }
};

/**
 * Get staff member by ID
 * @param staffId The ID of the staff member to retrieve
 * @returns A promise with the staff member data
 */
export const getStaffById = async (staffId: string) => {
  try {
    const response = await getData(`/staff/${staffId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching staff with ID ${staffId}:`, error);
    throw error;
  }
};

/**
 * Create a new staff member
 * @param staffData The data for the new staff member
 * @returns A promise with the created staff member
 */
export const createStaff = async (staffData: StaffCreatePayload | CreateStaffPayload) => {
  try {
    // Extract the profile picture from the data
    const { profilePicture, ...staffDataWithoutPicture } = staffData;
    
    // Create a new form data object for the request
    const formData = new FormData();
    
    // Add all the staff data to the form data
    Object.entries(staffDataWithoutPicture).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    // Add the profile picture if it exists
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    
    // Send the request
    const response = await postData('/staff', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating staff member:', error);
    throw error;
  }
};

/**
 * Update an existing staff member
 * @param staffData The updated data for the staff member
 * @returns A promise with the updated staff member
 */
export const updateStaff = async (staffData: StaffUpdatePayload | UpdateStaffPayload) => {
  try {
    const { staffId, profilePicture, ...staffDataWithoutPicture } = staffData;
    
    // Create a new form data object for the request
    const formData = new FormData();
    
    // Add all the staff data to the form data
    Object.entries(staffDataWithoutPicture).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    // Add the profile picture if it exists
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    
    // Send the request
    const response = await putData(`/staff/${staffId}`, formData);
    return response.data;
  } catch (error) {
    console.error(`Error updating staff member:`, error);
    throw error;
  }
};

/**
 * Delete a staff member
 * @param staffId The ID of the staff member to delete
 * @returns A promise with the deletion response
 */
export const deleteStaff = async (staffId: string) => {
  try {
    const response = await deleteData(`/staff/${staffId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting staff member with ID ${staffId}:`, error);
    throw error;
  }
};

// Parameters for uploadStaffProfilePicture
export interface UploadStaffProfilePictureParams {
  file: File;
  directory: string;
}

interface PresignedUrlResponse {
  data: {
    url: string;
    fields: Record<string, string>;
    key: string;
  }
}

/**
 * Upload a staff profile picture and get the URL
 * @param params The parameters for the upload
 * @returns A promise with the uploaded file URL
 */
export const uploadStaffProfilePicture = async (params: UploadStaffProfilePictureParams): Promise<{ url: string }> => {
  try {
    const { file, directory } = params;
    
    if (!file) {
      throw new Error('File is required');
    }
    
    // Get presigned URL from API
    const getUrlResponse = await postData<PresignedUrlResponse>(
      '/upload/presigned-url',
      {
        fileType: file.type,
        fileName: file.name,
        directory: directory || 'staff-profile-pictures'
      }
    );
    
    const { url, fields, key } = getUrlResponse.data.data;
    
    // Create form data for the file upload
    const formData = new FormData();
    
    // Add all the fields from the presigned URL response
    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue as string);
    });
    
    // Add the file itself
    formData.append('file', file);
    
    // Upload directly to the storage provider
    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    // Return the URL where the file can be accessed
    return {
      url: `${url}/${key}`
    };
  } catch (error) {
    console.error('Error uploading staff profile picture:', error);
    throw error;
  }
};

// Create a staff service object with all the functions
const staffService = {
  getStaffList,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  uploadStaffProfilePicture
};

// Export the staff service as default
export default staffService; 