import {
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_FAILURE,
  CREATE_ORGANISATION_REQUEST,
  CREATE_ORGANISATION_SUCCESS,
  CREATE_ORGANISATION_FAILURE,
  RESET_CREATE_ORGANISATION_STATE,
  UPDATE_ORGANISATION_REQUEST,
  UPDATE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_FAILURE,
  RESET_UPDATE_ORGANISATION_STATE,
  TOGGLE_ORGANISATION_MFA_REQUEST,
  TOGGLE_ORGANISATION_MFA_SUCCESS,
  TOGGLE_ORGANISATION_MFA_FAILURE,
  FetchOrganisationsRequestAction,
  FetchOrganisationsSuccessAction,
  FetchOrganisationsFailureAction,
  CreateOrganisationRequestAction,
  CreateOrganisationSuccessAction,
  CreateOrganisationFailureAction,
  ResetCreateOrganisationStateAction,
  UpdateOrganisationRequestAction,
  UpdateOrganisationSuccessAction,
  UpdateOrganisationFailureAction,
  ResetUpdateOrganisationStateAction,
  ToggleOrganisationMfaRequestAction,
  ToggleOrganisationMfaSuccessAction,
  ToggleOrganisationMfaFailureAction,
  OrganizationsResponse,
  CreateOrganizationResponse,
  UpdateOrganizationResponse,
  ToggleOrganizationMfaResponse,
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
  ToggleOrganizationMfaPayload,
  // Staff-related imports
  FETCH_ORGANISATION_STAFF_REQUEST,
  FETCH_ORGANISATION_STAFF_SUCCESS,
  FETCH_ORGANISATION_STAFF_FAILURE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  RESET_CREATE_STAFF_STATE,
  FetchOrganisationStaffRequestAction,
  FetchOrganisationStaffSuccessAction,
  FetchOrganisationStaffFailureAction,
  DeleteStaffRequestAction,
  DeleteStaffSuccessAction,
  DeleteStaffFailureAction,
  CreateStaffRequestAction,
  CreateStaffSuccessAction,
  CreateStaffFailureAction,
  ResetCreateStaffStateAction,
  OrganizationStaffResponse,
  CreateStaffPayload,
  CreateStaffResponse,
} from './types';

export const fetchOrganisationsRequest = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  mfaIsEnabled?: boolean;
}): FetchOrganisationsRequestAction => ({
  type: FETCH_ORGANISATIONS_REQUEST,
  payload: params,
});

export const fetchOrganisationsSuccess = (
  data: OrganizationsResponse
): FetchOrganisationsSuccessAction => ({
  type: FETCH_ORGANISATIONS_SUCCESS,
  payload: data,
});

export const fetchOrganisationsFailure = (error: string): FetchOrganisationsFailureAction => ({
  type: FETCH_ORGANISATIONS_FAILURE,
  payload: { error },
});

export const createOrganisationRequest = (
  payload: CreateOrganizationPayload
): CreateOrganisationRequestAction => ({
  type: CREATE_ORGANISATION_REQUEST,
  payload,
});

export const createOrganisationSuccess = (
  data: CreateOrganizationResponse
): CreateOrganisationSuccessAction => ({
  type: CREATE_ORGANISATION_SUCCESS,
  payload: data,
});

export const createOrganisationFailure = (error: string): CreateOrganisationFailureAction => ({
  type: CREATE_ORGANISATION_FAILURE,
  payload: { error },
});

export const resetCreateOrganisationState = (): ResetCreateOrganisationStateAction => ({
  type: RESET_CREATE_ORGANISATION_STATE,
});

export const updateOrganisationRequest = (
  payload: UpdateOrganizationPayload
): UpdateOrganisationRequestAction => ({
  type: UPDATE_ORGANISATION_REQUEST,
  payload,
});

export const updateOrganisationSuccess = (
  data: UpdateOrganizationResponse
): UpdateOrganisationSuccessAction => ({
  type: UPDATE_ORGANISATION_SUCCESS,
  payload: data,
});

export const updateOrganisationFailure = (error: string): UpdateOrganisationFailureAction => ({
  type: UPDATE_ORGANISATION_FAILURE,
  payload: { error },
});

export const resetUpdateOrganisationState = (): ResetUpdateOrganisationStateAction => ({
  type: RESET_UPDATE_ORGANISATION_STATE,
});

export const toggleOrganisationMfaRequest = (
  payload: ToggleOrganizationMfaPayload
): ToggleOrganisationMfaRequestAction => ({
  type: TOGGLE_ORGANISATION_MFA_REQUEST,
  payload,
});

export const toggleOrganisationMfaSuccess = (
  data: ToggleOrganizationMfaResponse
): ToggleOrganisationMfaSuccessAction => ({
  type: TOGGLE_ORGANISATION_MFA_SUCCESS,
  payload: data,
});

export const toggleOrganisationMfaFailure = (
  error: string
): ToggleOrganisationMfaFailureAction => ({
  type: TOGGLE_ORGANISATION_MFA_FAILURE,
  payload: { error },
});

// Staff-related action creators
export const fetchOrganisationStaffRequest = (params: {
  organizationId: string;
  page?: number;
  limit?: number;
  search?: string;
}): FetchOrganisationStaffRequestAction => ({
  type: FETCH_ORGANISATION_STAFF_REQUEST,
  payload: params,
});

export const fetchOrganisationStaffSuccess = (
  data: OrganizationStaffResponse
): FetchOrganisationStaffSuccessAction => ({
  type: FETCH_ORGANISATION_STAFF_SUCCESS,
  payload: data,
});

export const fetchOrganisationStaffFailure = (error: string): FetchOrganisationStaffFailureAction => ({
  type: FETCH_ORGANISATION_STAFF_FAILURE,
  payload: { error },
});

export const deleteStaffRequest = (
  staffId: string, 
  organizationId: string
): DeleteStaffRequestAction => ({
  type: DELETE_STAFF_REQUEST,
  payload: { staffId, organizationId },
});

export const deleteStaffSuccess = (
  staffId: string,
  message: string
): DeleteStaffSuccessAction => ({
  type: DELETE_STAFF_SUCCESS,
  payload: { staffId, message },
});

export const deleteStaffFailure = (error: string): DeleteStaffFailureAction => ({
  type: DELETE_STAFF_FAILURE,
  payload: { error },
});

// Staff creation action creators
export const createStaffRequest = (
  payload: CreateStaffPayload
): CreateStaffRequestAction => ({
  type: CREATE_STAFF_REQUEST,
  payload,
});

export const createStaffSuccess = (
  data: CreateStaffResponse
): CreateStaffSuccessAction => ({
  type: CREATE_STAFF_SUCCESS,
  payload: data,
});

export const createStaffFailure = (error: string): CreateStaffFailureAction => ({
  type: CREATE_STAFF_FAILURE,
  payload: { error },
});

export const resetCreateStaffState = (): ResetCreateStaffStateAction => ({
  type: RESET_CREATE_STAFF_STATE,
});
