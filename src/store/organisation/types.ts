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
  | ToggleOrganisationMfaFailureAction;

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
}
