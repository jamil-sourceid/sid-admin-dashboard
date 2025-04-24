import api, { postData, getData, putData, deleteData } from '@/setup/config/api';
import {
  StaffResponse,
  StaffByIdResponse,
  CreateStaffPayload,
  CreateStaffResponse,
  UpdateStaffPayload,
  UpdateStaffResponse,
  DeleteStaffResponse
} from '../store/staff/types';

// Define params interface that works with the API's getData function
interface StaffParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  [key: string]: unknown;
}

const staffService = {
  // Get list of staff members with optional filtering
  getStaffList: async (params?: StaffParams): Promise<StaffResponse> => {
    try {
      const response = await getData<StaffResponse>('/staff', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching staff list:', error);
      throw error;
    }
  },

  // Get a specific staff member by ID
  getStaffById: async (staffId: string): Promise<StaffByIdResponse> => {
    try {
      if (!staffId) {
        throw new Error('Staff ID is required');
      }
      const response = await getData<StaffByIdResponse>(`/staff/id/${staffId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching staff with ID ${staffId}:`, error);
      throw error;
    }
  },

  // Create a new staff member
  createStaff: async (staffData: CreateStaffPayload): Promise<CreateStaffResponse> => {
    try {
      if (!staffData) {
        throw new Error('Staff data is required');
      }
      
      // Handle file upload if profile picture is included
      if (staffData.profilePicture) {
        const formData = new FormData();
        
        // Add all other fields to form data
        Object.entries(staffData).forEach(([key, value]) => {
          if (key !== 'profilePicture' && value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        
        // Add profile picture last
        formData.append('profilePicture', staffData.profilePicture);
        
        const response = await api.post('/staff', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } else {
        // Regular JSON request if no profile picture
        // Create a clean copy without the profilePicture
        const { profilePicture, ...cleanData } = staffData;
        
        const response = await postData<CreateStaffResponse, typeof cleanData>('/staff', cleanData);
        return response.data;
      }
    } catch (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }
  },

  // Update an existing staff member
  updateStaff: async (staffData: UpdateStaffPayload): Promise<UpdateStaffResponse> => {
    try {
      if (!staffData || !staffData.staffId) {
        throw new Error('Staff ID is required for update');
      }
      
      const { staffId, ...updateData } = staffData;
      
      // Handle file upload if profile picture is included
      if (updateData.profilePicture) {
        const formData = new FormData();
        
        // Add all other fields to form data
        Object.entries(updateData).forEach(([key, value]) => {
          if (key !== 'profilePicture' && value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        
        // Add profile picture last
        formData.append('profilePicture', updateData.profilePicture);
        
        const response = await api.put(`/staff/${staffId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } else {
        // Regular JSON request if no profile picture
        // Create a clean copy without the profilePicture
        const { profilePicture, ...cleanData } = updateData;
        
        const response = await putData<UpdateStaffResponse>(`/staff/${staffId}`, cleanData);
        return response.data;
      }
    } catch (error) {
      console.error(`Error updating staff member:`, error);
      throw error;
    }
  },

  // Delete a staff member
  deleteStaff: async (staffId: string): Promise<DeleteStaffResponse> => {
    try {
      if (!staffId) {
        throw new Error('Staff ID is required for deletion');
      }
      const response = await deleteData<DeleteStaffResponse>(`/staff/${staffId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting staff member with ID ${staffId}:`, error);
      throw error;
    }
  }
};

export default staffService; 