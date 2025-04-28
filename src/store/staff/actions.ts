import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_STAFF_BY_ID_REQUEST,
  FETCH_STAFF_BY_ID_SUCCESS,
  FETCH_STAFF_BY_ID_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  RESET_CREATE_STAFF_STATE,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAILURE,
  RESET_UPDATE_STAFF_STATE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE,
  StaffAction,
  StaffResponse,
  StaffByIdResponse,
  CreateStaffPayload,
  UpdateStaffPayload,
  CreateStaffResponse,
  UpdateStaffResponse
} from './types';

// Fetch staff list actions
export const fetchStaffRequest = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): StaffAction => ({
  type: FETCH_STAFF_REQUEST,
  payload: params
});

export const fetchStaffSuccess = (response: StaffResponse): StaffAction => ({
  type: FETCH_STAFF_SUCCESS,
  payload: response
});

export const fetchStaffFailure = (error: string): StaffAction => ({
  type: FETCH_STAFF_FAILURE,
  payload: { error }
});

// Fetch staff by ID actions
export const fetchStaffByIdRequest = (staffId: string): StaffAction => ({
  type: FETCH_STAFF_BY_ID_REQUEST,
  payload: { staffId }
});

export const fetchStaffByIdSuccess = (response: StaffByIdResponse): StaffAction => ({
  type: FETCH_STAFF_BY_ID_SUCCESS,
  payload: response
});

export const fetchStaffByIdFailure = (error: string): StaffAction => ({
  type: FETCH_STAFF_BY_ID_FAILURE,
  payload: { error }
});

// Create staff actions
export const createStaffRequest = (staffData: CreateStaffPayload): StaffAction => ({
  type: CREATE_STAFF_REQUEST,
  payload: staffData
});

export const createStaffSuccess = (response: CreateStaffResponse): StaffAction => ({
  type: CREATE_STAFF_SUCCESS,
  payload: response
});

export const createStaffFailure = (error: string): StaffAction => ({
  type: CREATE_STAFF_FAILURE,
  payload: { error }
});

export const resetCreateStaffState = (): StaffAction => ({
  type: RESET_CREATE_STAFF_STATE
});

// Update staff actions
export const updateStaffRequest = (staffData: UpdateStaffPayload): StaffAction => ({
  type: UPDATE_STAFF_REQUEST,
  payload: staffData
});

export const updateStaffSuccess = (response: UpdateStaffResponse): StaffAction => ({
  type: UPDATE_STAFF_SUCCESS,
  payload: response
});

export const updateStaffFailure = (error: string): StaffAction => ({
  type: UPDATE_STAFF_FAILURE,
  payload: { error }
});

export const resetUpdateStaffState = (): StaffAction => ({
  type: RESET_UPDATE_STAFF_STATE
});

// Delete staff actions
export const deleteStaffRequest = (staffId: string): StaffAction => ({
  type: DELETE_STAFF_REQUEST,
  payload: { staffId }
});

export const deleteStaffSuccess = (staffId: string, message: string): StaffAction => ({
  type: DELETE_STAFF_SUCCESS,
  payload: { staffId, message }
});

export const deleteStaffFailure = (error: string): StaffAction => ({
  type: DELETE_STAFF_FAILURE,
  payload: { error }
}); 