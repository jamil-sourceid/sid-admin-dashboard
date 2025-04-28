// Action Types
export const FETCH_STAFF_REQUEST = 'FETCH_STAFF_REQUEST';
export const FETCH_STAFF_SUCCESS = 'FETCH_STAFF_SUCCESS';
export const FETCH_STAFF_FAILURE = 'FETCH_STAFF_FAILURE';

export const FETCH_STAFF_BY_ID_REQUEST = 'FETCH_STAFF_BY_ID_REQUEST';
export const FETCH_STAFF_BY_ID_SUCCESS = 'FETCH_STAFF_BY_ID_SUCCESS';
export const FETCH_STAFF_BY_ID_FAILURE = 'FETCH_STAFF_BY_ID_FAILURE';

export const CREATE_STAFF_REQUEST = 'CREATE_STAFF_REQUEST';
export const CREATE_STAFF_SUCCESS = 'CREATE_STAFF_SUCCESS';
export const CREATE_STAFF_FAILURE = 'CREATE_STAFF_FAILURE';
export const RESET_CREATE_STAFF_STATE = 'RESET_CREATE_STAFF_STATE';

export const UPDATE_STAFF_REQUEST = 'UPDATE_STAFF_REQUEST';
export const UPDATE_STAFF_SUCCESS = 'UPDATE_STAFF_SUCCESS';
export const UPDATE_STAFF_FAILURE = 'UPDATE_STAFF_FAILURE';
export const RESET_UPDATE_STAFF_STATE = 'RESET_UPDATE_STAFF_STATE';

export const DELETE_STAFF_REQUEST = 'DELETE_STAFF_REQUEST';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';
export const DELETE_STAFF_FAILURE = 'DELETE_STAFF_FAILURE';

// Interface Definitions
export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phoneNumber: string;
  countryCode: string;
  country: string;
  profilePictureUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  organizationId?: string;
}

export interface StaffState {
  // Staff listing related
  staffMembers: StaffMember[];
  totalStaff: number;
  isLoadingStaff: boolean;
  staffError: string | null;
  
  // Individual staff member related
  currentStaff: StaffMember | null;
  isLoadingCurrentStaff: boolean;
  currentStaffError: string | null;
  
  // Staff creation related
  isCreatingStaff: boolean;
  createStaffSuccess: boolean;
  createStaffError: string | null;
  
  // Staff update related
  isUpdatingStaff: boolean;
  updateStaffSuccess: boolean;
  updateStaffError: string | null;
  
  // Staff deletion related
  isDeletingStaff: boolean;
  deleteStaffSuccess: boolean;
  deleteStaffError: string | null;
}

// Payload and Response types
export interface StaffResponse {
  data: StaffMember[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface StaffByIdResponse {
  data: StaffMember;
}

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
}

export interface CreateStaffResponse {
  data: StaffMember;
  message: string;
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
  status?: string;
}

export interface UpdateStaffResponse {
  data: StaffMember;
  message: string;
}

export interface DeleteStaffResponse {
  message: string;
}

// Action Interfaces
export interface FetchStaffRequestAction {
  type: typeof FETCH_STAFF_REQUEST;
  payload?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  };
}

export interface FetchStaffSuccessAction {
  type: typeof FETCH_STAFF_SUCCESS;
  payload: StaffResponse;
}

export interface FetchStaffFailureAction {
  type: typeof FETCH_STAFF_FAILURE;
  payload: { error: string };
}

export interface FetchStaffByIdRequestAction {
  type: typeof FETCH_STAFF_BY_ID_REQUEST;
  payload: { staffId: string };
}

export interface FetchStaffByIdSuccessAction {
  type: typeof FETCH_STAFF_BY_ID_SUCCESS;
  payload: StaffByIdResponse;
}

export interface FetchStaffByIdFailureAction {
  type: typeof FETCH_STAFF_BY_ID_FAILURE;
  payload: { error: string };
}

export interface CreateStaffRequestAction {
  type: typeof CREATE_STAFF_REQUEST;
  payload: CreateStaffPayload;
}

export interface CreateStaffSuccessAction {
  type: typeof CREATE_STAFF_SUCCESS;
  payload: CreateStaffResponse;
}

export interface CreateStaffFailureAction {
  type: typeof CREATE_STAFF_FAILURE;
  payload: { error: string };
}

export interface ResetCreateStaffStateAction {
  type: typeof RESET_CREATE_STAFF_STATE;
}

export interface UpdateStaffRequestAction {
  type: typeof UPDATE_STAFF_REQUEST;
  payload: UpdateStaffPayload;
}

export interface UpdateStaffSuccessAction {
  type: typeof UPDATE_STAFF_SUCCESS;
  payload: UpdateStaffResponse;
}

export interface UpdateStaffFailureAction {
  type: typeof UPDATE_STAFF_FAILURE;
  payload: { error: string };
}

export interface ResetUpdateStaffStateAction {
  type: typeof RESET_UPDATE_STAFF_STATE;
}

export interface DeleteStaffRequestAction {
  type: typeof DELETE_STAFF_REQUEST;
  payload: { staffId: string };
}

export interface DeleteStaffSuccessAction {
  type: typeof DELETE_STAFF_SUCCESS;
  payload: { staffId: string; message: string };
}

export interface DeleteStaffFailureAction {
  type: typeof DELETE_STAFF_FAILURE;
  payload: { error: string };
}

export type StaffAction =
  | FetchStaffRequestAction
  | FetchStaffSuccessAction
  | FetchStaffFailureAction
  | FetchStaffByIdRequestAction
  | FetchStaffByIdSuccessAction
  | FetchStaffByIdFailureAction
  | CreateStaffRequestAction
  | CreateStaffSuccessAction
  | CreateStaffFailureAction
  | ResetCreateStaffStateAction
  | UpdateStaffRequestAction
  | UpdateStaffSuccessAction
  | UpdateStaffFailureAction
  | ResetUpdateStaffStateAction
  | DeleteStaffRequestAction
  | DeleteStaffSuccessAction
  | DeleteStaffFailureAction; 