// Action Types
export const FETCH_ORGANISATIONS_REQUEST = 'FETCH_ORGANISATIONS_REQUEST';
export const FETCH_ORGANISATIONS_SUCCESS = 'FETCH_ORGANISATIONS_SUCCESS';
export const FETCH_ORGANISATIONS_FAILURE = 'FETCH_ORGANISATIONS_FAILURE';

export const CREATE_ORGANISATION_REQUEST = 'CREATE_ORGANISATION_REQUEST';
export const CREATE_ORGANISATION_SUCCESS = 'CREATE_ORGANISATION_SUCCESS';
export const CREATE_ORGANISATION_FAILURE = 'CREATE_ORGANISATION_FAILURE';
export const RESET_CREATE_ORGANISATION_STATE = 'RESET_CREATE_ORGANISATION_STATE';

export const UPDATE_ORGANISATION_REQUEST = 'UPDATE_ORGANISATION_REQUEST';
export const UPDATE_ORGANISATION_SUCCESS = 'UPDATE_ORGANISATION_SUCCESS';
export const UPDATE_ORGANISATION_FAILURE = 'UPDATE_ORGANISATION_FAILURE';
export const RESET_UPDATE_ORGANISATION_STATE = 'RESET_UPDATE_ORGANISATION_STATE';

export const TOGGLE_ORGANISATION_MFA_REQUEST = 'TOGGLE_ORGANISATION_MFA_REQUEST';
export const TOGGLE_ORGANISATION_MFA_SUCCESS = 'TOGGLE_ORGANISATION_MFA_SUCCESS';
export const TOGGLE_ORGANISATION_MFA_FAILURE = 'TOGGLE_ORGANISATION_MFA_FAILURE';

// Staff-related action types
export const FETCH_ORGANISATION_STAFF_REQUEST = 'FETCH_ORGANISATION_STAFF_REQUEST';
export const FETCH_ORGANISATION_STAFF_SUCCESS = 'FETCH_ORGANISATION_STAFF_SUCCESS';
export const FETCH_ORGANISATION_STAFF_FAILURE = 'FETCH_ORGANISATION_STAFF_FAILURE';

export const DELETE_STAFF_REQUEST = 'DELETE_STAFF_REQUEST';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';
export const DELETE_STAFF_FAILURE = 'DELETE_STAFF_FAILURE';

export const CREATE_STAFF_REQUEST = 'CREATE_STAFF_REQUEST';
export const CREATE_STAFF_SUCCESS = 'CREATE_STAFF_SUCCESS';
export const CREATE_STAFF_FAILURE = 'CREATE_STAFF_FAILURE';
export const RESET_CREATE_STAFF_STATE = 'RESET_CREATE_STAFF_STATE';

// Interface for Organization data
export interface Address {
  verified?: boolean;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  region: string;
  zipCode: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface KeyContact {
  _id: string;
  name: string;
}

export interface Organization {
  _id: string;
  name: string;
  img: string;
  mfaIsEnabled: boolean;
  user: string | null;
  industry: string;
  status: string;
  country: string;
  distanceTolerance: number;
  address: Address;
  keyContact: KeyContact;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateOrganizationPayload {
  name: string;
  img: string;
  phoneNumber: string;
  email: string;
  address: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    region: string;
    countryCode: string;
    zipCode: string;
    longitude?: number;
    latitude?: number;
  };
  country: string;
  distanceTolerance: number;
  mfaIsEnabled?: boolean;
}

export interface UpdateOrganizationPayload {
  organizationId: string;
  name: string;
  img: string;
  phoneNumber: string;
  email: string;
  address: {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    region: string;
    countryCode: string;
    zipCode: string;
    longitude?: number;
    latitude?: number;
  };
  country: string;
  distanceTolerance: number;
}

export interface ToggleOrganizationMfaPayload {
  organizationId: string;
  mfaIsEnabled: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
  total: number;
  count: number;
}

export interface OrganizationsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Organization[];
  meta: Pagination;
}

export interface CreateOrganizationResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Organization;
}

export interface UpdateOrganizationResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Organization;
}

export interface ToggleOrganizationMfaResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Organization;
}

// Staff interface
export interface StaffMember {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  middleName: string;
  photo: string;
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
  mfaTotpSecret: string | null;
  isMfaSetupComplete: boolean;
  verified: boolean;
  dateOfBirth: string;
  roles: string[];
  organization?: string;
  countryCode?: string;
}

// Staff-related responses
export interface OrganizationStaffResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: StaffMember[];
  meta: Pagination;
}

export interface DeleteStaffResponse {
  status: boolean;
  statusCode: number;
  message: string;
}

// Staff-related payloads
export interface CreateStaffPayload {
  title: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  roles: string[];
  groups?: string[];
  organization: string;
}

// Staff-related responses
export interface CreateStaffResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: StaffMember;
}

// Action Interfaces
export interface FetchOrganisationsRequestAction {
  type: typeof FETCH_ORGANISATIONS_REQUEST;
  payload?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    mfaIsEnabled?: boolean;
  };
}

export interface FetchOrganisationsSuccessAction {
  type: typeof FETCH_ORGANISATIONS_SUCCESS;
  payload: OrganizationsResponse;
}

export interface FetchOrganisationsFailureAction {
  type: typeof FETCH_ORGANISATIONS_FAILURE;
  payload: {
    error: string;
  };
}

export interface CreateOrganisationRequestAction {
  type: typeof CREATE_ORGANISATION_REQUEST;
  payload: CreateOrganizationPayload;
}

export interface CreateOrganisationSuccessAction {
  type: typeof CREATE_ORGANISATION_SUCCESS;
  payload: CreateOrganizationResponse;
}

export interface CreateOrganisationFailureAction {
  type: typeof CREATE_ORGANISATION_FAILURE;
  payload: {
    error: string;
  };
}

export interface ResetCreateOrganisationStateAction {
  type: typeof RESET_CREATE_ORGANISATION_STATE;
}

export interface UpdateOrganisationRequestAction {
  type: typeof UPDATE_ORGANISATION_REQUEST;
  payload: UpdateOrganizationPayload;
}

export interface UpdateOrganisationSuccessAction {
  type: typeof UPDATE_ORGANISATION_SUCCESS;
  payload: UpdateOrganizationResponse;
}

export interface UpdateOrganisationFailureAction {
  type: typeof UPDATE_ORGANISATION_FAILURE;
  payload: {
    error: string;
  };
}

export interface ResetUpdateOrganisationStateAction {
  type: typeof RESET_UPDATE_ORGANISATION_STATE;
}

export interface ToggleOrganisationMfaRequestAction {
  type: typeof TOGGLE_ORGANISATION_MFA_REQUEST;
  payload: ToggleOrganizationMfaPayload;
}

export interface ToggleOrganisationMfaSuccessAction {
  type: typeof TOGGLE_ORGANISATION_MFA_SUCCESS;
  payload: ToggleOrganizationMfaResponse;
}

export interface ToggleOrganisationMfaFailureAction {
  type: typeof TOGGLE_ORGANISATION_MFA_FAILURE;
  payload: {
    error: string;
  };
}

// Staff-related action interfaces
export interface FetchOrganisationStaffRequestAction {
  type: typeof FETCH_ORGANISATION_STAFF_REQUEST;
  payload: {
    organizationId: string;
    page?: number;
    limit?: number;
    search?: string;
  };
}

export interface FetchOrganisationStaffSuccessAction {
  type: typeof FETCH_ORGANISATION_STAFF_SUCCESS;
  payload: OrganizationStaffResponse;
}

export interface FetchOrganisationStaffFailureAction {
  type: typeof FETCH_ORGANISATION_STAFF_FAILURE;
  payload: {
    error: string;
  };
}

export interface DeleteStaffRequestAction {
  type: typeof DELETE_STAFF_REQUEST;
  payload: {
    staffId: string;
    organizationId: string;
  };
}

export interface DeleteStaffSuccessAction {
  type: typeof DELETE_STAFF_SUCCESS;
  payload: {
    staffId: string;
    message: string;
  };
}

export interface DeleteStaffFailureAction {
  type: typeof DELETE_STAFF_FAILURE;
  payload: {
    error: string;
  };
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
  payload: {
    error: string;
  };
}

export interface ResetCreateStaffStateAction {
  type: typeof RESET_CREATE_STAFF_STATE;
}

export type OrganisationActionTypes =
  | FetchOrganisationsRequestAction
  | FetchOrganisationsSuccessAction
  | FetchOrganisationsFailureAction
  | CreateOrganisationRequestAction
  | CreateOrganisationSuccessAction
  | CreateOrganisationFailureAction
  | ResetCreateOrganisationStateAction
  | UpdateOrganisationRequestAction
  | UpdateOrganisationSuccessAction
  | UpdateOrganisationFailureAction
  | ResetUpdateOrganisationStateAction
  | ToggleOrganisationMfaRequestAction
  | ToggleOrganisationMfaSuccessAction
  | ToggleOrganisationMfaFailureAction
  | FetchOrganisationStaffRequestAction
  | FetchOrganisationStaffSuccessAction
  | FetchOrganisationStaffFailureAction
  | DeleteStaffRequestAction
  | DeleteStaffSuccessAction
  | DeleteStaffFailureAction
  | CreateStaffRequestAction
  | CreateStaffSuccessAction
  | CreateStaffFailureAction
  | ResetCreateStaffStateAction;

// State Interface
export interface OrganisationState {
  loading: boolean;
  data: Organization[];
  error: string | null;
  meta: Pagination | null;
  createOrganization: {
    loading: boolean;
    success: boolean;
    error: string | null;
    data: Organization | null;
  };
  updateOrganization: {
    loading: boolean;
    success: boolean;
    error: string | null;
    data: Organization | null;
  };
  selectedOrganization: Organization | null;
  staff: {
    loading: boolean;
    data: StaffMember[];
    error: string | null;
    meta: Pagination | null;
    deleteLoading: boolean;
    deleteSuccess: boolean;
    deleteError: string | null;
    createStaff: {
      loading: boolean;
      success: boolean;
      error: string | null;
      data: StaffMember | null;
    };
  };
}
