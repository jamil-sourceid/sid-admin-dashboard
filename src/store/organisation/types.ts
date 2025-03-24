// Action Types
export const FETCH_ORGANISATIONS_REQUEST = 'FETCH_ORGANISATIONS_REQUEST';
export const FETCH_ORGANISATIONS_SUCCESS = 'FETCH_ORGANISATIONS_SUCCESS';
export const FETCH_ORGANISATIONS_FAILURE = 'FETCH_ORGANISATIONS_FAILURE';

// Interface for Organization data
export interface Address {
  verified: boolean;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  region: string;
  zipCode: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
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

// Action Interfaces
export interface FetchOrganisationsRequestAction {
  type: typeof FETCH_ORGANISATIONS_REQUEST;
  payload?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
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

export type OrganisationActionTypes =
  | FetchOrganisationsRequestAction
  | FetchOrganisationsSuccessAction
  | FetchOrganisationsFailureAction;

// State Interface
export interface OrganisationState {
  loading: boolean;
  data: Organization[];
  error: string | null;
  meta: Pagination | null;
}
